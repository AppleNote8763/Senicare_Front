import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { useSignInUserStore } from 'src/stores';

// variable: 기본 프로필 이미지 URL //
const defaultProfileImageUrl = 'https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png';

// component: 고객 정보 작성 화면 컴포넌트 //
export default function CSWrite() {

    // state: 로그인 유저 상태 //
    const { signInUser } = useSignInUserStore();

    // state: 이미지 입력 참조 //
    const imageInputRef = useRef<HTMLInputElement|null>(null);

    // state: 프로필 미리보기 URL 상태 //
    const [previewUrl, setPreviewUrl] = useState<string>(defaultProfileImageUrl);

    // state: 모달 팝업 상태 //
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // state: 고객 정보 상태 //
    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [profileImageFile, setProfileImageFile] = useState<File|null>(null);
    const [charger, setCharger] = useState<string>('');
    const [chargerName, setChargerName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    // function: 다음 주소 검색 팝업 함수 //
    const daumPostcodePopup = useDaumPostcodePopup();

    // function: 다음 주소 검색 완료 처리 함수 //
    const daumPostcodeComplete = (result: Address) => {
        const { address, sigungu } = result;
        setAddress(address);
        setLocation(sigungu);
        console.log(sigungu);
    }

    // event handler: 프로필 이미지 클릭 이벤트 처리 //
    const onProfileImageClickHandler = () => {
        const { current } = imageInputRef;
        if (!current) return;
        current.click();
    }

    // event handler: 이미지 변경 이벤트 처리 함수 //
    const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files || !files.length) return;

        const file = files[0];
        setProfileImageFile(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            setPreviewUrl(fileReader.result as string);
        }
    }

    // event handler: 고객 이름 변경 이벤트 처리 함수 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    }

    // event handler: 생년월일 변경 이벤트 처리 함수 //
    const onBirthChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const regexp = /^\d{0,6}$/
        const isMatched = regexp.test(value);
        if (!isMatched) return;
        setBirth(value);
    }

    // event handler: 주소 검색 버튼 클릭 이벤트 처리 //
    const onAddressButtonClickHandler = () => {
        daumPostcodePopup({ onComplete: daumPostcodeComplete });
    }

    // event handler: 담당자 본인 선택 버튼 클릭 이벤트 처리 //
    const onChargerSelfButtonClickHandler = () => {
        if (!signInUser) return;
        setCharger(signInUser.userId);
        setChargerName(signInUser.name);
    }

    // event handler: 모달 오픈 이벤트 처리 //
    const onModalOpenHandler = () => {
        setModalOpen(!modalOpen);
    }

    // effect: 모달 오픈 상태가 바뀔 시 스크롤 여부 함수 //
    useEffect(() => {
        document.body.style.overflow = modalOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [modalOpen]);

    // render: 고객 정보 작성 화면 컴포넌트 렌더링 //
    return (
        <div id='cs-write-wrapper'>
            <div className='main'>
                <div className='profile-image' style={{ backgroundImage: `url(${previewUrl})` }} onClick={onProfileImageClickHandler}>
                    <input ref={imageInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={onImageInputChangeHandler} />
                </div>
                <div className='input-container'>
                    <div className='input-box'>
                        <div className='input-label'>고객 이름</div>
                        <input className='input' value={name} placeholder='고객 이름을 입력하세요' onChange={onNameChangeHandler} />
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>생년월일</div>
                        <input className='input' value={birth} placeholder='6자리 생년월일을 입력하세요' onChange={onBirthChangeHandler} />
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>담당자</div>
                        <input className='input' value={chargerName} readOnly placeholder='담당자를 선택하세요' />
                        <div className='button-box'>
                            <div className='button second' onClick={onChargerSelfButtonClickHandler}>자신</div>
                            <div className='button disable' onClick={onModalOpenHandler}>검색</div>
                        </div>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>주소</div>
                        <input className='input' value={address} readOnly placeholder='주소를 선택하세요' />
                        <div className='button-box'>
                            <div className='button disable' onClick={onAddressButtonClickHandler}>검색</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <div className='button primary'>목록</div>
                <div className='button second'>등록</div>
            </div>
            {modalOpen && 
            <div className='modal'>
                <div className='modal-box'>
                    <div className='modal-top'>
                        <div className='modal-label'>담당자 이름</div>
                        <div className='modal-input-box'>
                            <input className='modal-input' placeholder='이름을 입력하세요' />
                            <div className='button disable'>검색</div>
                        </div>
                    </div>
                    <div className='modal-main'>
                        <div className='table'>
                            <div className='th'>
                                <div className='td-nurse-id'>ID</div>
                                <div className='td-nurse-name'>이름</div>
                                <div className='td-nurse-tel-number'>전화번호</div>
                            </div>
                            <div className='tr'>
                                <div className='td-nurse-id'>ID</div>
                                <div className='td-nurse-name'>이름</div>
                                <div className='td-nurse-tel-number'>전화번호</div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-bottom'>
                        <div className='button disable' onClick={onModalOpenHandler}>닫기</div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
