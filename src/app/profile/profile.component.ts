import { Component, OnInit } from '@angular/core';
import {MemberService} from "../services/member.service";
import {Member} from "../model/member.model";
import {MemberProfile} from "../model/member-profile.model";
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public member: Member;
  public memberProfile: MemberProfile
  ready: boolean;
  public date = '';
  constructor(private memberService: MemberService) {
    this.member = new Member();
    this.ready = false;
    this.memberProfile = new MemberProfile();
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getInfo().subscribe(value => {
      this.member = value.body;
      console.log('this.member', this.member);
      if (this.member.memberProfiles !== undefined) {
        this.memberProfile = this.member.memberProfiles;
      }

      this.ready = true;
    }, error => {
      alert(error.error.message)
    })
  }

}
