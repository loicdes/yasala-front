import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CATEGORIES } from '../const';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

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
    description: new FormControl(''),
    categories: new FormControl([]),
    photo: new FormControl('')
  });
  localCompressedURl:any;

  constructor(private imageCompress: NgxImageCompressService, private userService: UserService,
              private productService: ProductService, private router: Router) { }
  
  ngOnInit(): void {
    this.productForm.setValue(
      {
        name: this.userService.currentUser.name,
        tel: this.userService.currentUser.tel,
        address: '',
        caution: '',
        description: '',
        categories: [],
        photo: ''
      }
    );
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
  submit() {
    const product = this.productForm.value;
    product.photo = this.localCompressedURl;
    this.productService.createOrUpdateProduct(product).subscribe(() => {
      this.router.navigate([`/location/categorie/${product.categorie}`]);
    });
  }

}
