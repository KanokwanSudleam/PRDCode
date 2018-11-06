import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Contact extends Component{
    constructor(props) {
        super(props);  
    }

    render(){
        const contentStyle = {margin: '0 16px'};
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-step">

                        <div>
                            <div style={{marginTop: 12}}>
                                <h3 className='font-text' style={{color:'#00349A'}}>มูลนิธิเพื่อผู้บริโภค</h3>
                                <p><img src='./img/map.png' className='img-fluid'  style={{width: '40px',height: '40px'}}/><a href="https://goo.gl/maps/ymH876r2TiB2" target="_self"  style={{'vertical-align': 'middle'}}>&nbsp;&nbsp;เเผนที่ มูลนิธิเพื่อผู้บริโภค</a></p>
                                <p> 4/2 ซ.วัฒนโยธิน แขวงถนนพญาไท เขตราชเทวี กรุงเทพฯ 10400 โทรศัพท์ <a href="tel:02-248-3734">02 248 3734 </a> ถึง 37 แฟกซ์ 02 248 3733</p>
                                <p><a href="http://www.consumerthai.org/" target="_self">http://www.consumerthai.org/</a></p>
                                <p><a href="mailto:complaint@consumerthai.org" target="_self" ><img src='./img/email.png'  style={{width: '40px',height: '40px'}}/></a>&nbsp;&nbsp;<a href="mailto:complaint@consumerthai.org" target="_top" style={{'vertical-align': 'middle'}} >complaint@consumerthai.org</a></p>
                                <p><a href="https://www.facebook.com/fconsumerthai" target="_self" className='img-fluid'><img src='./img/facebook.png'  style={{width: '40px',height: '40px'}}/>&nbsp;&nbsp;มูลนิธิเพื่อผู้บริโภค</a></p>
                                <p><a href='https://www.youtube.com/user/TheConsumerthai/' target="_top" className='img-fluid'><img src='./img/youtube.png'  style={{width: '40px',height: '40px'}}/>&nbsp;&nbsp;TheConsumerthai</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Contact.contextTypes = {
	router: PropTypes.object
  };

export default Contact;