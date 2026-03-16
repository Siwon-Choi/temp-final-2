// import { useState, type SubmitEvent } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { requestLogin, requestSignup } from '../api/auth'
// import { DEFAULT_SCHOOL_PATH } from '../constants/schools'
// import { useAuthStore } from '../store/authStore'
// import style from './styles/LoginPage.module.css'

// function LoginPage() {
//   const navigate = useNavigate()
//   const setAuthState = useAuthStore((state) => state.setAuthState)
//   const [mode, setMode] = useState<'login' | 'signup'>('login')
//   const [loginForm, setLoginForm] = useState({ email: '', password: '' })
//   const [signupForm, setSignupForm] = useState({
//     email: '',
//     password: '',
//     name: '',
//     phone: '',
//     address: '',
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState<string | null>(null)

//   const handleLoginSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setErrorMessage(null)

//     try {
//       await requestLogin(loginForm)
//       setAuthState({ isAuthenticated: true })
//       navigate(DEFAULT_SCHOOL_PATH, { replace: true })
//     } catch (error) {
//       setErrorMessage(
//         error instanceof Error ? error.message : '로그인에 실패했습니다.',
//       )
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSignupSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setErrorMessage(null)

//     try {
//       await requestSignup(signupForm)
//       setLoginForm({
//         email: signupForm.email,
//         password: signupForm.password,
//       })
//       setMode('login')
//     } catch (error) {
//       setErrorMessage(
//         error instanceof Error ? error.message : '회원가입에 실패했습니다.',
//       )
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className={style.LoginPage}>
//       <div className={style.LoginPageBasic}>
//         <div className={style.LoginPageText}>
//           <div>안녕하세요.</div>
//           <div>RE:CALL 입니다.</div>
//           <p style={{ fontSize: '16px' }}>
//             찾고 싶은 추억 속 친구가 있으신가요?
//           </p>
//         </div>

//         <div className={style.LoginButton}>
//           <div style={{ marginLeft: '10px' }}>
//             {mode === 'login' ? '로그인' : '회원가입'}

//             {mode === 'login' && (
//               <form onSubmit={handleLoginSubmit}>
//                 <div>
//                   <input
//                     type="email"
//                     placeholder="이메일"
//                     value={loginForm.email}
//                     onChange={(e) =>
//                       setLoginForm({ ...loginForm, email: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <input
//                     type="password"
//                     placeholder="비밀번호"
//                     value={loginForm.password}
//                     onChange={(e) =>
//                       setLoginForm({ ...loginForm, password: e.target.value })
//                     }
//                   />
//                 </div>

//                 <button type="submit" disabled={isLoading}>
//                   로그인
//                 </button>
//               </form>
//             )}

//             {mode === 'signup' && (
//               <form onSubmit={handleSignupSubmit}>
//                 <div>
//                   <input
//                     type="email"
//                     placeholder="이메일"
//                     value={signupForm.email}
//                     onChange={(e) =>
//                       setSignupForm({ ...signupForm, email: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <input
//                     type="password"
//                     placeholder="비밀번호"
//                     value={signupForm.password}
//                     onChange={(e) =>
//                       setSignupForm({ ...signupForm, password: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <input
//                     type="text"
//                     placeholder="이름"
//                     value={signupForm.name}
//                     onChange={(e) =>
//                       setSignupForm({ ...signupForm, name: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <input
//                     type="text"
//                     placeholder="전화번호"
//                     value={signupForm.phone}
//                     onChange={(e) =>
//                       setSignupForm({ ...signupForm, phone: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <input
//                     type="text"
//                     placeholder="주소"
//                     value={signupForm.address}
//                     onChange={(e) =>
//                       setSignupForm({ ...signupForm, address: e.target.value })
//                     }
//                   />
//                 </div>

//                 <button type="submit" disabled={isLoading}>
//                   회원가입
//                 </button>
//               </form>
//             )}

//             {errorMessage && <p>{errorMessage}</p>}
//           </div>

//           <div>
//             <button type="button" onClick={() => setMode('login')}>
//               로그인
//             </button>
//             <button type="button" onClick={() => setMode('signup')}>
//               회원가입
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LoginPage
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin, requestSignup } from '../api/auth';
import { DEFAULT_SCHOOL_PATH } from '../constants/schools';
import { useAuthStore } from '../store/authStore';
import style from './styles/LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate();
  const setAuthState = useAuthStore((state) => state.setAuthState);

  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
  });

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await requestLogin(loginForm);

      setAuthState({ isAuthenticated: true });

      navigate(DEFAULT_SCHOOL_PATH, { replace: true });
    } catch {
      alert('로그인 실패');
    }
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await requestSignup(signupForm);

      alert('회원가입 성공');

      setIsRightPanelActive(false);
    } catch {
      alert('회원가입 실패');
    }
  };

  return (
    <div
      className={`${style.container} ${
        isRightPanelActive ? style.rightPanelActive : ''
      }`}
    >
      {/* SIGN UP */}
      <div className={`${style.formContainer} ${style.signUpContainer}`}>
        <form onSubmit={handleSignupSubmit}>
          <h1>Create Account</h1>

          <span>or use your email for registration</span>

          <input
            type="text"
            placeholder="Name"
            value={signupForm.name}
            onChange={(e) =>
              setSignupForm({ ...signupForm, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={signupForm.email}
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={signupForm.password}
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            value={signupForm.phone}
            onChange={(e) =>
              setSignupForm({ ...signupForm, phone: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Address"
            value={signupForm.address}
            onChange={(e) =>
              setSignupForm({ ...signupForm, address: e.target.value })
            }
          />

          <button>Sign Up</button>
        </form>
      </div>

      {/* SIGN IN */}
      <div className={`${style.formContainer} ${style.signInContainer}`}>
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign In</h1>

          <span>or use your account</span>

          <input
            type="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
          />

          <button>Sign In</button>
        </form>
      </div>

      {/* OVERLAY */}
      <div className={style.overlayContainer}>
        <div className={style.overlay}>
          <div className={`${style.overlayPanel} ${style.overlayLeft}`}>
            <h1>Welcome Back!</h1>

            <p>
              To keep connected with us please login with your personal info
            </p>

            <button
              className={style.ghost}
              onClick={() => setIsRightPanelActive(false)}
            >
              Sign In
            </button>
          </div>

          <div className={`${style.overlayPanel} ${style.overlayRight}`}>
            <h1>Hello, Friend!</h1>

            <p>
              Enter your personal details and start journey with us
            </p>

            <button
              className={style.ghost}
              onClick={() => setIsRightPanelActive(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;