import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
  standalone: true
})
export class DefaultImagePipe implements PipeTransform {

  transform(imageUrl: string | null | undefined): string {
    console.log('DefaultImagePipe input:', imageUrl);
    
    // Si imageUrl está vacía, null o undefined, usar imagen SVG inline
    if (!imageUrl || imageUrl.trim() === '') {
      const result = 'data:image/svg+xml;base64,' + btoa(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f5f5f5"/>
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="18" fill="#999">No Image</text>
        </svg>
      `);
      console.log('DefaultImagePipe output (empty): SVG data URL');
      return result;
    }
    
    // Si la imagen no empieza con http, crear SVG con el nombre del archivo
    if (!imageUrl.startsWith('http')) {
      const imageName = imageUrl.replace('.jpg', '').replace('.png', '');
      const result = 'data:image/svg+xml;base64,' + btoa(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#e3f2fd"/>
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16" fill="#1976d2">${imageName}</text>
        </svg>
      `);
      console.log('DefaultImagePipe output (local): SVG data URL for', imageName);
      return result;
    }
    
    // Si ya es una URL completa, devolverla tal como está
    console.log('DefaultImagePipe output (url):', imageUrl);
    return imageUrl;
  }
}