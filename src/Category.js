import React from 'react';
import PropTypes from 'prop-types';

const Category = ({field,change,css}) => (

        <div>
        <div className="row" id="category">
            <div className="col-md-6 col-12 text-center  margin-bottom-five">

                <img src="./img/icon-money.jpg" className="img-fluid img-thumbnail img-width-80" data-toggle="collapse" data-target="#money" aria-expanded="false" aria-controls="money" style={{border:css("1.การเงินการธนาคาร/ประกัน")}} onClick={change} data-name="1.การเงินการธนาคาร/ประกัน" alt="money" />
            </div>
            <div className="collapse col-12 img-width-80" id="money" data-parent="#category">
                <div className="text-center">
                    สินเชื่อส่วนบุคคล  ธุรกิจเช่าซื้อ   หนี้ทั้งในและนอกระบบ ประกันภัย/ประกันชีวิต  การเรียกเก็บค่าธรรมเนียม
                </div>
            </div>
            <div className="col-md-6 col-12 text-center margin-bottom-five">

                <img src="./img/icon-pubpluc.jpg" className="img-fluid img-thumbnail img-width-80" data-toggle="collapse" data-target="#public" aria-expanded="false" aria-controls="public" style={{border:css("2.บริการสาธารณะ")}} onClick={change} data-name="2.บริการสาธารณะ" alt="pubpluc" />
            </div>
            <div className="collapse col-12 img-width-80" id="public" data-parent="#category">
                <div className="text-center">
                ปัญหาด้านสาธารณูปโภค(น้ำประปา ไฟฟ้า)    ระบบคมนาคม  พลังงาน    สถานศึกษา  หน่วยงานรัฐ
                </div>
            </div>
            <div className="col-md-6 col-12 text-center  margin-bottom-five">

                <img src="./img/icon-talecom.jpg" className="img-fluid img-thumbnail img-width-80" data-toggle="collapse" data-target="#talecom" aria-expanded="false" aria-controls="talecom" style={{border:css("3.สื่อและโทรคมนาคม")}}  onClick={change} data-name="3.สื่อและโทรคมนาคม" alt="talecom" />
            </div>
            <div className="collapse col-12 img-width-80" id="talecom" data-parent="#category">
                <div className="text-center">
                บริการโทรศัพท์บ้าน ,มือถือ , โทรศัพท์สาธารณะ/     SMS กวนใจ / อินเตอร์เน็ต / ค่าบริการระหว่างต่างประเทศแพงเกินจริง /การตั้งเสาสัญญาณโทรศัพท์/กล่องรับสัญญาณทีวี
                </div>
            </div>
            <div className="col-md-6 col-12 text-center  margin-bottom-five">

                <img src="./img/icon-home.jpg" className="img-fluid img-thumbnail img-width-80" data-toggle="collapse" data-target="#home" aria-expanded="false" aria-controls="home" style={{border:css("4.อสังหาริมทรัพย์(ที่อยู่อาศัย)")}}  data-name="4.อสังหาริมทรัพย์(ที่อยู่อาศัย)" alt="home" onClick={change} />
            </div>
            <div className="collapse col-12 img-width-80" id="home" data-parent="#category">
                <div className="text-center">
                เช่าหรือซื้อบ้าน คอนโด ที่ดิน อาคารพาณิชน์แล้วเกิดปัญหาทั้งสัญญาเช่า /ถูกยกเลิกสัญญาก่อนกำหนด/ ไม่คืนเงินประกันค่าเช่า/บ้านพัง-ทรุด
                </div>
            </div>
            <div className="col-md-6 col-12 text-center  margin-bottom-five">

                <img src="./img/icon-produc.jpg" className="img-fluid img-thumbnail img-width-80" data-toggle="collapse" data-target="#produc" aria-expanded="false" aria-controls="produc" style={{border:css("5.สินค้าบริการทั่วไป")}}  data-name="5.สินค้าบริการทั่วไป" alt="produc" onClick={change} />
            </div>
            <div className="collapse col-12 img-width-80" id="produc" data-parent="#category">
                <div className="text-center">
                สินค้าชำรุด / ไม่ได้มาตรฐาน/ขายสินค้าแพงเกินกำหนด /สถานบริการให้เซ็นต์สัญญาไม่เป็นธรรม / พนักงานบริการไม่สุภาพ
                </div>
            </div>
            <div className="col-md-6 col-12 text-center  margin-bottom-five">

                <img src="./img/icon-medical.jpg" className="img-fluid img-thumbnail img-width-80" data-toggle="collapse" data-target="#medical" aria-expanded="false" aria-controls="medical"  style={{border:css("6.บริการสุขภาพและสาธารณสุข")}} data-name="6.บริการสุขภาพและสาธารณสุข" alt="medical" onClick={change} />
            </div>
            <div className="collapse col-12 img-width-80" id="medical" data-parent="#category">
                <div className="text-center">
                สิทธิข้าราชการ / สิทธิประกันสังคม / สิทธิบัตรทอง / สิทธิรักษาผู้ประสบภัยจากรถ                
                </div>
            </div>
            <div className="col-md-6 col-12 text-center  margin-bottom-five">

                <img src="./img/icon-food.jpg" className="img-fluid img-thumbnail img-width-80" data-toggle="collapse" data-target="#food" aria-expanded="false" aria-controls="food"  style={{border:css("7.อาหาร ยา เครื่องสำอาง ผลิตภัณฑ์เพื่อสุขภาพ")}} data-name="7.อาหาร ยา เครื่องสำอาง ผลิตภัณฑ์เพื่อสุขภาพ" alt="food" onClick={change} />
            </div>
            <div className="collapse col-12 img-width-80 " id="food" data-parent="#category">
                <div className="text-center">
                มีสิ่งปลอมปนในอาหาร/ยาปลอม / เครื่องสำอางไม่ปลอดภัย/โฆษณาเกินจริงของผลิตภัณฑ์สุขภาพ
                </div>
            </div>
            <div className="col-md-6 col-12 text-center  margin-bottom-five">

                <img src="./img/icon-other.jpg" className="img-fluid img-thumbnail img-width-80" data-toggle="collapse" data-target="#other" aria-expanded="false" aria-controls="other" style={{border:css("8.อื่นๆ")}}  data-name="8.อื่นๆ" alt="other" onClick={change} />
            </div>
            <div className="collapse col-12 img-width-80 " id="other" data-parent="#category">
                <div className="text-center">
                เรื่องอื่นๆ
                </div>
            </div>
        </div> 
        </div>
);


Category.propTypes = {
    field: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    css : PropTypes.func.isRequired
};

export default Category;
