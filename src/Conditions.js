import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Conditions extends Component{
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
                                <h3 className='font-text' style={{color:'#00349A'}}>เงื่อนไขการร้องทุกข์ออนไลน์ ศูนย์พิทักษ์สิทธิผู้บริโภค มูลนิธิเพื่อผู้บริโภค</h3>
                                <h3 className='font-text' style={{color:'#00349A'}}>(Conditions of Online-Complaint, Complaint and Legal Assistance Centre)</h3>
                                <div>
                                    <ul>
                                        <li>
                                            ผู้ร้องเรียนกรุณาอ่านและปฏิบัติตามข้อตกลงด้านล่างนี้โดยละเอียด เพื่อรักษาสิทธิประโยชน์ในการการร้องเรียนของท่าน
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li>
                                            ผู้ร้องเรียนต้องกรอกข้อมูลส่วนตัวและที่เกี่ยวข้องด้วยความสัตย์จริงให้ครบ ทุกข้อ เพื่อสิทธิประโยชน์ของท่าน และยินยอม ให้มูลนิธิฯ สามารถตรวจสอบความเป็นจริงในข้อมูลการสมัครของท่านได้
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <ol>
                                    <li>
                                        การร้องเรียนต้องมีเจตนาที่บริสุทธิ์ ไม่แอบอ้าง กล่าวร้ายป้ายสี หรือกระทำการใด ๆ ที่ทำให้ผู้ที่ไม่ได้มีส่วนเกี่ยวข้อง ได้รับความเสียหายโดยไม่สมควร
                                    </li>
                                    <li>
                                        ผู้ร้องเรียนต้องปฏิบัติตามกฎ กติกา มารยาท ที่มูลนิธิฯ ตั้งขึ้นมาอย่างเคร่งครัด ทั้งนี้เพื่อความเรียบร้อยในการรับเรื่องร้องเรียน Online ของมูลนิธิฯ หากท่านละเมิดกฎข้อใด มูลนิธิฯ ขอสงวนสิทธิ์ระงับการร้องเรียนและให้ความช่วยเหลือ โดยจะแจ้งให้ทราบภายใน 7 วัน หลังการระงับสิทธิการร้องเรียน
                                    </li>
                                    <li>
                                        ข้อมูลรายละเอียดส่วนตัวของผู้ร้องเรียน จะถูกเก็บเป็นความลับอย่างสูงสุด มูลนิธิฯ จะไม่เปิดเผยหากไม่ได้รับความยินยอมจากท่านเป็นลายลักษณ์อักษร 
                                    </li>
                                    <li>
                                        เรื่องราวและรายละเอียดการร้องเรียนให้ถือเป็นสิทธิของมูลนิธิฯ ที่จะเผยแพร่สู่สาธารณชนเพื่อประโยชน์ในการคุ้มครองผู้บริโภค โดยจะไม่เปิดเผยชื่อและรายละเอียดส่วนตัวของผู้ร้องเรียน หากไม่ได้รับความยินยอมจากผู้ร้องเรียนเป็นลายลักษณ์อักษร และขอสงวนสิทธิ์มิให้ผู้ใดนำไปใช้เพื่อประโยชน์ทางธุรกิจโดยเด็ดขาด
                                    </li>
                                    <li>
                                        มูลนิธิเพื่อผู้บริโภคไม่เก็บค่าใช้จ่ายใด ๆ ในการร้องเรียน
                                    </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Conditions.contextTypes = {
	router: PropTypes.object
  };

export default Conditions;