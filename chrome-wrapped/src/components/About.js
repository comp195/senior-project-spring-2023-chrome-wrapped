/* global chrome */

const About = () => {

    const openLink = (url) => {
        chrome.tabs.create({
            url: url,
            active: true
          })
    }

    return (
        <div>
            <div>
                <h2 style={{color:"#3e42a7"}}><center>The Team</center></h2>
                <h3><center>Sage Lee, Jordan Somers, Michelle Vu</center></h3>
                <h2 style={{color:"#3e42a7"}}><center>About Senior Project</center></h2>
                <h3 ><center>Chrome Wrapped enhances your browsing experience written in React.js</center></h3>
            </div>
            <div className="container">
                <h3 onClick={() => openLink('https://forms.gle/7hnGy6iebANHyCTCA')}><a href = 'https://forms.gle/7hnGy6iebANHyCTCA'><center>Report any bugs/feature requests</center></a></h3>
            </div>
            <div className="container">
                <h3 onClick={() => openLink('https://github.com/comp195/senior-project-spring-2023-chrome-wrapped')}><a href = 'https://github.com/comp195/senior-project-spring-2023-chrome-wrapped'><center>View source code</center></a></h3>
            </div>

            
        </div>

    )

}

export default About