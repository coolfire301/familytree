import { Component } from '@angular/core';
import FamilyTree from "@balkangraph/familytree.js";
import {HttpClient} from '@angular/common/http';
import { AppComponent } from '../app.component';
import { tap } from 'rxjs';

//type Ouders = Array<{id: number, fid: number, mid: number, naam1: string, naam2: string}>
type DataType = { id: number, fid: number, mid: number, name: string };
type DataType2 = { id: number, mid: number, name: string };
type DataType3 = { id: number, mid: number, name: string };

@Component({
  selector: 'app-stamboom',
  templateUrl: './stamboom.component.html',
  styleUrls: ['./stamboom.component.css']
})
export class StamboomComponent {
  title = 'familytree';
  

  //ouders
  myData: any = [];
  id_data: any = [];
  fid_data: any = [];
  mid_data: any = [];
  naam1: any = [];
  naam2: any = [];
  oudersData: DataType[] = [];

  //kinderen
  MyKinderen: any = [];
  id_kinderen: any = []; 
  oid_kinderen: any = []; 
  naam1_kinderen: any = []; 
  naam2_kinderen: any = [];
  KinderenData: DataType2[] = [];

    //kinderen
    MyKleinkinderen: any = [];
    id_kleinkinderen: any = []; 
    oid_kleinkinderen: any = []; 
    naam1_kleinkinderen: any = []; 
    naam2_kleinkinderen: any = [];
    KleinkinderenData: DataType3[] = [];


  

  readonly ROOT_URL_ouders = this.AppComponent.apiUrl + '/getallouders';
  readonly ROOT_URL_kinderen =  this.AppComponent.apiUrl + '/getallkinderen';
  readonly ROOT_URL_kleinkinderen =  this.AppComponent.apiUrl + '/getallkleinkinderen';



  constructor(private http:HttpClient, private AppComponent:AppComponent) {

   }



    async ngOnInit() {
      const tree = document.getElementById('tree');

      //Oma opa gedeelte
      const tesje = [              { id: 1, pids: [2], name: "Opa"},
      { id: 2, pids: [1], name: "Oma"} 
      ]

      //Ouders gedeelte
      this.myData = await this.http.get(this.ROOT_URL_ouders).toPromise();
      this.id_data = this.myData.map((result: { id: number; }) => result.id);
      this.fid_data = this.myData.map((result: { fid: number; }) => result.fid);
      this.mid_data = this.myData.map((result2: { mid: number; }) => result2.mid);
      this.naam1 = this.myData.map((result2: { naam1: any; }) => result2.naam1);
      this.naam2 = this.myData.map((result2: { naam2: any; }) => result2.naam2);

      for (let i = 0; i < this.naam1.length; i++) {
        let obj; // declare obj outside if-else block
        if (this.naam2[i].length > 1){
          obj = {id: this.id_data[i], fid: this.fid_data[i], mid: this.mid_data[i], name: this.naam1[i]+ " ♥ "  + this.naam2[i]}
        }
        else {
          obj = {id: this.id_data[i], fid: this.fid_data[i], mid: this.mid_data[i], name: this.naam1[i]}
        }
        this.oudersData.push(obj);
      }

      //Kinderen gedeelte
      this.MyKinderen = await this.http.get(this.ROOT_URL_kinderen).toPromise();
      this.id_kinderen = this.MyKinderen.map((result: { id: number; }) => result.id);
      this.oid_kinderen = this.MyKinderen.map((result: { oid: number; }) => result.oid);
      this.naam1_kinderen = this.MyKinderen.map((result2: { naam1: any; }) => result2.naam1);
      this.naam2_kinderen = this.MyKinderen.map((result2: { naam2: any; }) => result2.naam2);

      for (let i = 0; i < this.id_kinderen.length; i++) {
        let obj2; // declare obj outside if-else block
        if (this.naam2_kinderen[i].length > 1){
          obj2 = {id: this.id_kinderen[i], mid: this.oid_kinderen[i], name: this.naam1_kinderen[i] + " ♥ "  + this.naam2_kinderen[i]}
        }
        else {
          obj2 = {id: this.id_kinderen[i], mid: this.oid_kinderen[i], name: this.naam1_kinderen[i]}
        }
        this.KinderenData.push(obj2);
      }

      //KleinKinderen gedeelte
      this.MyKleinkinderen = await this.http.get(this.ROOT_URL_kleinkinderen).toPromise();
      this.id_kleinkinderen = this.MyKleinkinderen.map((result: { id: number; }) => result.id);
      this.oid_kleinkinderen = this.MyKleinkinderen.map((result: { oid: number; }) => result.oid);
      this.naam1_kleinkinderen = this.MyKleinkinderen.map((result2: { naam: any; }) => result2.naam);

      for (let i = 0; i < this.id_kleinkinderen.length; i++) {
        const obj = {id: this.id_kleinkinderen[i], mid: this.oid_kleinkinderen[i], name: this.naam1_kleinkinderen[i]}
        this.KleinkinderenData.push(obj);
      }


      console.log(this.oid_kinderen)

      console.log(this.ROOT_URL_kleinkinderen)
      
      console.log([...tesje, ...this.oudersData, ...this.KinderenData, ...this.KleinkinderenData])
      setTimeout(() => {
        location.reload();
      }, 5000);

    

 if (tree) {
          FamilyTree.templates["myTemplate"] = Object.assign({}, FamilyTree.templates["tommy"]);  
          FamilyTree.templates["myTemplate"].size = [100, 50];
          FamilyTree.templates["myTemplate"].defs = "";
          FamilyTree.templates["myTemplate"].node = '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#adbdff" stroke="#434656" rx="7" ry="7"></rect>'
          FamilyTree.templates["myTemplate_male"] = Object.assign({}, FamilyTree.templates["myTemplate"]);
          FamilyTree.templates["myTemplate_female"] = Object.assign({}, FamilyTree.templates["myTemplate"]);
          FamilyTree.templates["myTemplate"].ripple = {
            radius: 100,
            color: "#e6e6e6",
        };
        FamilyTree.templates["myTemplate"]["field_0"]  = '<text data-width="100" data-text-overflow="multiline-3" style="font-size: 18px; font-family: Arial" fill="#00000" x="50" y="30" text-anchor="middle">{val}</text>';
        FamilyTree.templates["myTemplate"]["img_0"]  =
        '<clipPath id="ulaImg">'
        + '<circle cx="100" cy="150" r="40"></circle>'
        + '</clipPath>'
        + '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="60" y="110" width="80" height="80">'
        + '</image>';
    


          var family = new FamilyTree(tree, {
              template: "myTemplate",
              nodeBinding: {
              field_0: "name",
              img_0: "photo"
              },
          });
          
          

          //Mid = ouders ID
           family.load([...tesje, ...this.oudersData, ...this.KinderenData, ...this.KleinkinderenData]);
      }

}


}
