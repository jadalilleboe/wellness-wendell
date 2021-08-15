import React from 'react'
import design from '../img/design.png'

const Home = () => {
      return (
        <>
        <div className='container'>
          <h1 className='title'>Wellness Wendell</h1>
        </div>
        <div className='reasons-container'>
          <ul className='reasons'>
            <li>Reminders</li>
            <li>Wellness Messages</li>
            <li>Combat loneliness with Wellness Wendell!</li>
          </ul>
        </div>
        <div class='home-content'>
          <img src={design} alt="graphic which shows a text message icon pointing to a heart icon. Wellness wendell messages are lovely!" height="600" width="500"/>
          <p className='text-left' style={{margin: 'auto', fontSize: 25}}>Use Wellness Wendell to send yourself reminder messages, wellness messages, or just get a friendly hello from Wellness Wendell all via text! Sign up for a free account today!</p>
        </div>
        </>
      )
}

export default Home