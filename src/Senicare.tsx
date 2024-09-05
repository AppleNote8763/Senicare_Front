import React, { useEffect } from 'react';
import './Senicare.css';
import Auth from 'src/views/Auth';
import { Route, Routes, useNavigate } from 'react-router';
import MainLayout from './layout/MainLayout';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, AUTH_PATH, CS_ABSOLUTE_PATH, CS_DETAIL_PATH, CS_PATH, CS_UPDATE_PATH, CS_WRITE_PATH, HR_DETAIL_PATH, HR_PATH, HR_UPDATE_PATH, MM_PATH, OTHERS_PATH } from './constants';

// component: root path 컴포넌트 //
function Index() {

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // function: 네이게이터 함수 //
  const navigator = useNavigate();

  // effect: 마운트 시 경로 이동 effect //
  useEffect(() => {
    // 쿠키의 속성에 접근
    if (cookies[ACCESS_TOKEN]) navigator(CS_ABSOLUTE_PATH);
    // TODO: /auth로 경로 이동
    else navigator(AUTH_ABSOLUTE_PATH);
  }, []);

  // render: root path 컴포넌트 렌더링 //
  return (
    <></>
  );
}

// component: Senicare 컴포넌트 //
export default function Senicare() {

  // render: Senicare 컴포넌트 렌더링 //
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={AUTH_PATH} element={<Auth />} />
      <Route path={CS_PATH} element={<MainLayout />}>
        <Route index element={<>고객 리스트 보기</>} />
        <Route path={CS_WRITE_PATH} element={<>고객 등록</>} />
        <Route path={CS_DETAIL_PATH(':customNumber')} element={<>고객 정보 보기</>} />
        <Route path={CS_UPDATE_PATH(':customNumber')} element={<>고객 정보 수정</>} />
      </Route>
      <Route path={MM_PATH} element={<MainLayout />}>
        <Route index element={<></>} />
      </Route>
      <Route path={HR_PATH} element={<MainLayout />}>
        <Route index element={<></>} />
        <Route path={HR_DETAIL_PATH(':userId')} element={<></>} />
        <Route path={HR_UPDATE_PATH(':userId')} element={<></>} />
      </Route>
      <Route path={OTHERS_PATH} element={<Index />} />
    </Routes>
  );
}
