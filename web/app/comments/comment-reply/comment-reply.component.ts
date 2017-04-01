import { Component, Input, ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { FormGroup , FormBuilder, FormControl, ValidatorFn, Validators, AbstractControl} from '@angular/forms';

@Component({
    selector: 'commentreply',
    templateUrl: "app/comments/comment-reply/comment-reply.component.html"
 })
export class CommentReplyComponent {
    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
    @Input() blog : any;
    @Input() formid : string;
    @Input() respondsTo : any;
    @Input() originalComment : any;
    commentReplyForm : FormGroup;
    userHitReply: boolean;
    EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    constructor(private _fb: FormBuilder){
        this.userHitReply = false;
        this.commentReplyForm = this._fb.group({  
            name :  ['', [Validators.required]],
            content : ['', [Validators.required]],
            email : ['', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
            website: '',
            date: this.getCurrentDate(),
            captchaResponse: ['', [Validators.required]],
            respondsTo: ''
         });   
         
            
    }
    captchaResponse(captchaResponse: string) {
        this.commentReplyForm.patchValue({"captchaResponse" : captchaResponse});
    }

    submitNewComment(){
        this.userHitReply = true;

        if(this.commentReplyForm.valid
             && this.captcha.getResponse() 
             && this.captcha.getResponse() !== ''){
        
                //comment submission here
            }
    }

    cancelComment(){
        this.commentReplyForm.reset();
    }

    private getCurrentDate(){
        var today = new Date();
        var dd : any= today.getDate();
        var mm : any= today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        var result = mm+'/'+ dd +'/'+ yyyy;
        return result;
    }
}
