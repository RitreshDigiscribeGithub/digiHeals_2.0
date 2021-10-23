import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from '@app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-upload-docs',
  templateUrl: './upload-docs.component.html',
  styleUrls: ['./upload-docs.component.less'],
})
export class UploadDocsComponent implements OnInit {
  constructor(private titleService: DynamicTitleService) {}
  ListItems: any[] = [
    {
      type: 'application',
      extension: 'pdf',
      fileName: 'File_Name',
      size: '2.4 Mb',
      date: new Date(),
    },
    {
      type: 'video',
      extension: 'mp4',
      fileName: 'File_Name',
      size: '2.4 Mb',
      date: new Date(),
    },
  ];

  imgPreview = null;

  fileSave(fsEvent: any) {
    const selectFile = fsEvent.target.files;

    for (let i = 0; i < selectFile.length; i++) {
      const types = selectFile[i].type.split('/')[0];
      const extension = selectFile[i].type.split('/')[1];
      let reader = new FileReader();
      reader.readAsDataURL(selectFile[i]);

      this.ListItems.push({
        type: types,
        extension: extension,
        fileName: selectFile[i].name.replace(`.${extension}`, ' '),
        size: selectFile[i].size,
        date: selectFile[i].lastModifiedDate,
        img: () =>
          types === 'image' ? (reader.onload = () => reader.result)() : null,
      });
    }
    console.log(selectFile);
  }

  radio(e) {
    console.log(e.target.value);
  }
  ngOnInit(): void {
    this.titleService.setHeaderTitle('scan rx');
  }
}
