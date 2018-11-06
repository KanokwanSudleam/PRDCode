import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Channel extends Component{
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
                                <h3 className='font-text' style={{color:'#00349A'}}>เปิดช่องทางการร้องทุกข์ หลากหลายช่องทางด้วยกัน ได้แก่</h3>
                                <div>
                                    <p>( 1 )&nbsp;&nbsp;ให้คำปรึกษาผ่านทางโทรศัพท์</p>
                                    <p  style={{'text-indent': '2.5em'}}>ที่หมายเลขโทรศัพท์ <a href="tel:02 248 3737">02 248 3737 </a></p>
                                    <p  style={{'text-indent': '2.5em'}}>จันทร์ - ศุกร์ เวลา 09.00 - 17.00 น.</p>
                                    <p  style={{'text-indent': '2.5em'}}>(ยกเว้นวันเสาร์ - อาทิตย์ และวันหยุดราชการ)</p>
                                </div>
                                <br/>
                                <div>
                                    <p>( 2 )&nbsp;&nbsp;ร้องเรียนผ่านแบบฟอร์มร้องทุกข์</p>
                                    <p style={{'text-indent': '2.5em'}}>คลิก <a href='http://www.consumerthai.org/component/phocadownload/category/7-file.html?download=46:complaint-form-pdf' target="_self">ดาวโหลดแบบฟอร์ม </a></p>
                                    <div>
                                        <ul>
                                            <li>
                                                กรอกรายละเอียดแล้วส่งแฟกซ์ มาที่ 02 248 3733
                                                <br></br>
                                                หรือ ส่งอีเมล์ได้ที่ <a href="mailto:complaint@consumerthai.org" target="_self" >complaint@consumerthai.org</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul>
                                            <li>
                                                กรณีต้องการส่งเป็นจดหมาย โปรดส่งมาที่
                                            <br></br>
                                            มูลนิธิเพื่อผู้บริโภค
                                                เลขที่ 4/2 ซอยวัฒนโยธิน แขวงถนนพญาไท
                                                เขตราชเทวี กรุงเทพฯ 10400
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <p>( 3 )&nbsp;&nbsp;ร้องเรียนผ่าน Facebook Fanpage ของมูลนิธิฯ ที่</p>
                                    <p style={{'text-indent': '2.5em'}}><a href='https://www.facebook.com/fconsumerthai' target="_self" className='img-fluid'><img src='./img/facebook.png'  style={{width: '40px',height: '40px'}}/>&nbsp;&nbsp;มูลนิธิเพื่อผู้บริโภค</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Channel.contextTypes = {
	router: PropTypes.object
  };

export default Channel;