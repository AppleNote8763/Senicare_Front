import React from 'react'
import './style.css';
import InputBox from 'src/components/InputBox';

export default function Auth() {
    return (
        <div id="auth-wrapper">
            <div className="auth-image"></div>
            <div className="auth-container">
                <div style={{gap: '16px'}} className="auth-box">
                
                    <div className="title-box">
                        <div className="title">시니케어</div>
                        <div className="logo"></div>
                    </div>

                    <div className="sns-container">
                        <div className="title">sns 회원가입</div>
                        <div className="sns-button-container">
                            <div className="sns-button md kakao"></div>
                            <div className="sns-button md naver"></div>
                        </div>
                    </div>

                    <div style={{width: '64px'}} className="divider"></div>

                    <div className="input-container">

                        <InputBox label='이름' type='text' placeholder='이름을 입력해주세요' />
                        <InputBox label='아이디' type='text' placeholder='아이디를 입력해주세요' buttonName='중복확인' />
                        <InputBox label='비밀번호' type='password' placeholder='비밀번호를 입력해주세요' />
                        <InputBox label='비밀번호 확인' type='password' placeholder='비밀번호를 입력해주세요' />
                        <InputBox label='전화번호' type='text' placeholder='-빼고 입력해주세요' buttonName='전화번호 인증' />
                        <InputBox label='인증번호' type='text' placeholder='인증번호 4자리를 입력해주세요' buttonName='인증 확인' />

                    </div>

                    <div className="button-container">
                        <div id="sign-up-button" className="button disable full-width">회원가입</div>
                        <div className="link">로그인</div>
                    </div>

                </div>
            </div>
        </div>
    )
}