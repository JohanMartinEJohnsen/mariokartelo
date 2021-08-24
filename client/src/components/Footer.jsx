import React from "react";

function Footer(){
    return(
        <div className="footer">
            <h4 > Takk til:</h4>
            <div className="sponsorContainer">
                <img src="https://orland-naringsforum.no/wp-content/uploads/2017/11/sparebank1-logo-300x160.png" alt="sparebank1" className="sponsorPic"/>
                <img src="https://www.sintef.no/globalassets/sintef-ocean/sfi-harvest/partners/kongsberg-logo_4f_31045256946_o.jpg?mode=crop&quality=80" alt="kongsberggruppen" className="sponsorPic"/>
                <img src="https://innsida.ntnu.no/documents/10157/2546401449/ntnu_med_slagord_hoeyde_bokmaal.png/bf417c87-a4fd-4725-a341-adfa84715e2f?t=1578568440614" alt="ntnu" className="sponsorPic"/>
                <img src="https://i.imgur.com/UzUAD60.png" alt="guttaConsulting" className="sponsorPic"/>
            </div>
        </div>
    )
}

export default Footer;