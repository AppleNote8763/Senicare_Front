import React, { useEffect } from 'react';
import './Senicare.css';
import Auth from 'src/views/Auth';
import { Route, Routes, useNavigate } from 'react-router';
import MainLayout from './layout/MainLayout';
import { useCookies } from 'react-cookie';

// component: root path 컴포넌트 //
function Index() {

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // function: 네이게이터 함수 //
  const navigator = useNavigate();

  // effect: 마운트 시 경로 이동 effect //
  useEffect(() => {
    // 쿠키의 속성에 접근
    if (cookies.accessToken) navigator('/cs');
    // TODO: /auth로 경로 이동
    else navigator('/auth');
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
      <Route path='/auth' element={<Auth />} />
      <Route path='/cs' element={<MainLayout />}>
        <Route index element={<>고객 리스트 보기</>} />
        <Route path='write' element={<>고객 등록</>} />
        <Route path=':customNumber' element={<>고객 정보 보기</>} />
        <Route path=':customNumber/update' element={<>고객 정보 수정</>} />
      </Route>
      <Route path='/mm' element={<MainLayout />}>
        <Route index element={<></>} />
      </Route>
      <Route path='/hr' element={<MainLayout />}>
        <Route index element={<></>} />
        <Route path=':userId' element={<></>} />
        <Route path=':userId/update' element={<></>} />
      </Route>
      <Route path='*' element={<Index />} />
    </Routes>
  );
}
