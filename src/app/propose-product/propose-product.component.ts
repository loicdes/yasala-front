import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CATEGORIES } from '../const';

@Component({
  selector: 'app-propose-product',
  templateUrl: './propose-product.component.html',
  styleUrls: ['./propose-product.component.scss']
})
export class ProposeProductComponent implements OnInit {

  categories = CATEGORIES;
  productForm = new FormGroup({
    name: new FormControl(''),
    tel: new FormControl(''),
    address: new FormControl(''),
    caution: new FormControl(''),
    categorie: new FormControl(''),
    photo: new FormControl('')
  });
  localCompressedURl:any;

  constructor(private imageCompress: NgxImageCompressService) { }
  
  ngOnInit(): void {
  }

  selectFile(event: any) {
    var fileName : any;
    var file = event.target.files[0];
    if (file) {
      fileName = file['name'];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.compressFile(event.target.result,fileName)
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  compressFile(image: any, fileName: string) {
    var orientation = -1;
    this.imageCompress.compressFile(image, orientation, 50, 50).then(result => {
      this.localCompressedURl = result;
      // create file from byte
      const imageName = fileName;
      // call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(result.split(',')[1]);
      //imageFile created below is the new compressed file which can be send to API in form data
      const imageFile = new File([result], imageName, { type: 'image/jpeg' });
    });
  }

  dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

}
