from flask import Flask
from flask_cors import CORS, cross_origin
import discogs_client
from credentials import personal_token, username

app = Flask(__name__)
CORS(app, resources={r"/api/*":{"origins":"*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


d = discogs_client.Client('my_user_agent/1.0', user_token=personal_token)
my_profile = d.identity()



@app.route('/get-folder-list')
@cross_origin()
def get_folder_list():
    response = []
    folders = my_profile.collection_folders
    for folder in folders:
        response.append({'name': folder.name, 'count': folder.count, 'id':folder.id})
    return {'folders': response}
    

@app.route('/get-folder-items/<folder_id>')
@cross_origin()
def get_folder_items(folder_id):
    paginated_folder_items = []
    current_page = d._get(f'https://api.discogs.com/users/{username}/collection/folders/{folder_id}/releases')
    num_pages = current_page['pagination']['pages']
    
    page = 1
    while page <= num_pages:
        paginated_folder_items.append(process_folder_items(current_page['releases']))
        if page < num_pages:
            current_page = d._get(current_page['pagination']['urls']['next'])
        page +=1
    return {'pages' : paginated_folder_items}

def process_folder_items(items):
    result = []
    for item in items:
        item_data = item['basic_information']
        record_item = {
            'id': item_data['id'],
            'title': item_data['title'],
            'year': item_data['year'],
            'artist': item_data['artists'][0]['name'],
            'image': item_data['thumb']
        }
        result.append(record_item)
    return result


if __name__ == '__main__':
    app.run()


