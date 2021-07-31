import { fileUpload } from '../../helpers/fileUpload';
import cloudinary from 'cloudinary';
// cd
cloudinary.config({
    cloud_name: 'dwykvlgjd',
    api_key: '354117426978117',
    api_secret: 'LBYrRcy-tI5nKcVtnxXTiXOi0sE',
    secure: true,
});
describe('Pruebas en la carga de archivo', () => {
    test('debe cargar un archivo y retornar el url', async () => {
        const resp = await fetch(
            'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
        );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');
        cloudinary.v2.api.delete_resources(imageId,() => {});
    });
    test('debe retornar un error', async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});
