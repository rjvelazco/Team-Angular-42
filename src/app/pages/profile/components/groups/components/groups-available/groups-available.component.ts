import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../../../../../core/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups-available',
  templateUrl: './groups-available.component.html',
  styleUrls: ['./groups-available.component.css']
})
export class GroupsAvailableComponent implements OnInit {

  public technologies;
  public sortOrder: number;
  public sortField: string;
  public loading = true;
  public filter = [];
  public groupsAvailable = [];
  public groupId = localStorage.getItem('groupId');
  public usuario;

  constructor(private usuarioService: UsuarioService,) {
    this.groups();
    this.getGroupName();
    this.usuario = this.usuarioService.usuario;
  }

  onSortChange(event) {
    if (event.value.length > 0) {
      let value = event.value.map(value => value.name);
      this.filter = this.groupsAvailable.filter(
        x => value.includes(x.data.technology)
      );
    } else {
      this.filter = this.groupsAvailable;
    }
  }


  ngOnInit(): void {
    console.log(this.filter)
    this.technologies = [
      {name: 'Python'},
      {name: 'JavaScript'},
      {name: 'Kotlin'},
      {name: 'Ruby'},
      {name: 'Go'},
      {name: 'PHP'},
      {name: 'Typescript'},
      {name: 'Java'},
      {name: 'Go'},
      {name: 'Ruby'},
      {name: 'Flutter'},
      {name: 'C++'},
      {name: 'C#'},
    ];
  }

  getGroupName(){

  }

  joinGroup(groupId) {
    Swal.fire({
      icon: 'info',
      title: '¿Estas seguro de entrar al grupo?',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.usuario.group = groupId;
        await this.usuarioService.updateParticipante(this.usuario);
      }
    });
  }

  groups() {
    this.usuarioService.grupos()
      .subscribe((response) => {
        response.forEach((responseData: any) => {
          this.groupsAvailable.push({
            id: responseData.payload.doc.id,
            data: responseData.payload.doc.data(),
          });
        });
        this.loading = false;
        this.filter = this.groupsAvailable;
      });
    console.log(this.groupsAvailable)
  }
}
