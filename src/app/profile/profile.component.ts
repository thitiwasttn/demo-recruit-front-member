import {Component, OnInit} from '@angular/core';
import {MemberService} from "../services/member.service";
import {Member} from "../model/member.model";
import {MemberProfile} from "../model/member-profile.model";
import * as $ from 'jquery';
import {JobService} from "../services/job.service";
import {Job} from "../model/job.model";
import {JobVM} from "../model/job-vm.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public member: Member;
  public memberProfile: MemberProfile
  ready: boolean;
  jobs: Job[];
  jobVms: JobVM[]

  constructor(private memberService: MemberService, private jobService: JobService) {
    this.member = new Member();
    this.ready = false;
    this.memberProfile = new MemberProfile();
    this.jobs = [];
    this.jobVms = [];
  }

  ngOnInit(): void {
    this.loadJobs().then(value => {
      this.loadMember();
    });

  }

  loadMember() {
    this.memberService.getInfo().subscribe(value => {
      this.member = value.body;
      console.log('this.member', this.member);
      if (this.member.memberProfiles !== undefined) {
        this.memberProfile = this.member.memberProfiles;
      }
      if (this.member.jobs !== undefined) {
        this.jobs = this.member.jobs;
        this.jobs.forEach(value1 => {
          this.jobVms.forEach(value2 => {
            if (value2.id == value1.id) {
              value2.selected = true;
            }
          })
          console.log(this.jobVms);
        })
      }

      this.ready = true;
    }, error => {
      alert(error.error.message)
    })
  }

  private async loadJobs()  {
    this.jobService.getJobs().subscribe(value => {
      this.jobs = value.body;
      this.jobs.forEach(value1 => {
        let jobVM = new JobVM();
        jobVM.id = value1.id;
        jobVM.jobName = value1.jobName;
        this.jobVms.push(jobVM);
      })
    })
  }
}
