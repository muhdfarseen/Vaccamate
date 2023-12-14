
import './Features.css';

export default function Features() {
  return (
    <div className="body">
        <div id="Features" className="containerfeatures">
            <img className="logoimage"  src="images\logobigwordmark.png" width="356px" alt=""/>
            <p className="logocaption">Stronger immunity, brighter future</p>

            <div className="fecont">
                <div>
                    <img className="fetimg" src="images\fe1.png"  alt=""/>
                </div>
                <div className="fetext">
                    <h1 className="Fehead">
                        Track your child’s vaccine
                    </h1>
                    <p className="fedesc">
                        Monitor and protect your child's health with <br/>
                        our easy-to-use vaccine tracking system.
                    </p>
                </div>
                
            </div>

            <div className="fecont">
                
                <div className="fetext">
                    <h1 className="Fehead">
                    Verify your child’s vaccine
                    </h1>
                    <p className="fedesc">
                    Securely protect your child's health <br />
                    with vaccination verification.
                    </p>
                </div>
                <div>
                    <img className="fetimg" src="images\fe2.png" height="180px" alt=""/>
                </div>
                
            </div>

            <div className="fecont">
                <div>
                    <img className="fetimg" src="images\fe3.png" height="180px" alt=""/>
                </div>
                <div className="fetext">
                    <h1 className="Fehead">
                    Stay Informed About Vaccinations
                    </h1>
                    <p className="fedesc">
                    Stay informed and up-to-date with <br />
                    vaccination notifications.
                    </p>
                </div>
                
            </div>

            <div className="fecont">
                
                <div className="fetext">
                    <h1 className="Fehead">
                    Share your child’s vaccine info
                    </h1>
                    <p className="fedesc">
                    Easily share vaccination reports with <br />
                    healthcare providers.
                    </p>
                </div>
                <div>
                    <img className="fetimg" src="images\fe4.png" height="180px" alt=""/>
                </div>
                
            </div>

        </div>
    </div>
  )
}
