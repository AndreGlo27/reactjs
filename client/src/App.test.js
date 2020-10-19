import React from 'react';
import {render, fireEvent,createEvent, screen} from '@testing-library/react'
import {BrowserRouter } from "react-router-dom";
import Homepage from './components/pages/homepage';
import Login from './components/pages/login';
import Profile from './components/pages/profil';
import Universities from './components/pages/universities';

test('allows the user to login successfully', async () => {
  render(<Login />)

  // fill out the form
  fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
    target: {value: 'sayaadmin@gmail.com'},
  })
  fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
    target: {value: 'sayaadmin'},
  })

  fireEvent.click(screen.getByText(/Submit/i))

  expect(window.localStorage.getItem('isLogin')).toEqual("true")
  expect(window.localStorage.getItem('loginEmail')).toEqual("sayaadmin@gmail.com")
  expect(window.localStorage.getItem('user'))
})

test('back to login if isLogin false from Homepage', async () => {
  render(
  <BrowserRouter>
  <Homepage />
  <Login/>
  </BrowserRouter>);
  window.localStorage.setItem('isLogin','false')
  expect(screen.getByPlaceholderText(/Enter email/i))
})

test('back to login if isLogin false from Profile page', async () => {
  render(
  <BrowserRouter>
  <Profile />
  <Login/>
  </BrowserRouter>);
  window.localStorage.setItem('isLogin','false')
  expect(screen.getByPlaceholderText(/Enter email/i))
})

test('back to login if isLogin false from Search Page', async () => {
  render(
  <BrowserRouter>
  <Universities />
  <Login/>
  </BrowserRouter>);
  window.localStorage.setItem('isLogin','false')
  expect(screen.getByPlaceholderText(/Enter email/i))
})

test('search by university name', async () => {
  render(<Universities/>);

fireEvent.change(screen.getByPlaceholderText(/University Name/i), {
  target: {value: 'Universitas Indonesia'},
})
fireEvent.click(screen.getByTestId(/searchbtn/i))
  
  expect(screen.findAllByText(/visit website/i))
})

test('search by country name', async () => {
  render(<Universities/>);

fireEvent.change(screen.getByPlaceholderText(/Country/i), {
  target: {value: 'Turkey'},
})
fireEvent.click(screen.getByTestId(/searchbtn/i))
  
  expect(screen.findAllByText(/visit website/i))
})

test('search data not found', async () => {
  render(<Universities/>);

fireEvent.change(screen.getByPlaceholderText(/Country/i), {
  target: {value: 'xxx'},
})
fireEvent.click(screen.getByTestId(/searchbtn/i))
  
  expect(screen.findAllByText(/data not found/i))
})

// test('scroll universities page load more data', async () => {
//   render(<Universities/>);
//   fireEvent.change(screen.getByPlaceholderText(/Country/i), {
//     target: {value: 'Turkey'},
//   })
//   fireEvent.click(screen.getByTestId(/searchbtn/i))
//   fireEvent.scroll(screen, {
//     target: {scrollY: 800},
//     })
//   expect(screen.getByTestId(/11/i))
// })

