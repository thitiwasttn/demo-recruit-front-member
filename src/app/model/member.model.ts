import {MemberProfile} from "./member-profile.model";
import {Job} from "./job.model";
import {MemberVideo} from "./member-video.model";
import {MemberCertificate} from "./member-certificate.model";

export class Member {


  constructor(public id?: number,
              public email?: string,
              public status?: boolean,
              public memberProfile?: MemberProfile,
              public jobs?: Job[],
              public memberVideo?: MemberVideo,
              public memberCertificate?: MemberCertificate) {
  }
}
