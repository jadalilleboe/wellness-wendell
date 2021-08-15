import React from 'react'

const About = () => {
    return (
        <div className='container about'>
            <h1 className='title'>Wellness Wendell</h1>
            <p>Wellness Wendell is a website where you can customize wellness messages sent to you via text. Please sign up for an account to start receiving messages, or view the demo video to see what having a Wellness Wendell account is like!</p>
            <p className='text-center'>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/UTPakLlPmR8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
            <p>Wellness Wendell was created by <a href='http://jadalilleboe.github.io'>Jada Lilleboe</a>, a computer science student at the University of Minnesota. Check out the github repository for this application.</p>
        </div>
    )
}

export default About