import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup,ListGroupItem } from 'react-bootstrap';

const FormResponse = ({field,change,clickrequest,myColor}) => (

<div>
    <div className="container">
      <div className="row">
        <div className="col-12">
        <div>
            <ListGroup>
                {/* <ListGroupItem className="text-left" style={{backgroundColor: myColor("1.ให้ชดเชยเยียวยา")}}  id="request" value="1.ให้ชดเชยเยียวยา" onClick={clickrequest}>1.ให้ชดเชยเยียวยา </ListGroupItem>
                <ListGroupItem className="text-left" style={{backgroundColor: myColor("2.ให้ผู้ประกอบธุรกิจมีมาตรการแก้ไขปัญหา")}}  id="request" value="2.ให้ผู้ประกอบธุรกิจมีมาตรการแก้ไขปัญหา" onClick={clickrequest} >2.ให้ผู้ประกอบธุรกิจมีมาตรการแก้ไขปัญหา</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("3.ให้ผู้ประกอบธุรกิจยุติการดำเนินการ")}} id="request" value="3.ให้ผู้ประกอบธุรกิจยุติการดำเนินการ" onClick={clickrequest}>3.ให้ผู้ประกอบธุรกิจยุติการดำเนินการ</ListGroupItem> */}
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("1. ขอเปลี่ยนคืนสินค้า")}} id="request" value="1. ขอเปลี่ยนคืนสินค้า" onClick={clickrequest}>1. ขอเปลี่ยนคืนสินค้า</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("2. เร่งรัดกระบวนการส่งสินค้า")}} id="request" value="2. เร่งรัดกระบวนการส่งสินค้า" onClick={clickrequest}>2. เร่งรัดกระบวนการส่งสินค้า</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("3. ต้องการคำอธิบาย/ การยืนยันความถูกต้อง")}} id="request" value="3. ต้องการคำอธิบาย/ การยืนยันความถูกต้อง" onClick={clickrequest}>3. ต้องการคำอธิบาย/ การยืนยันความถูกต้อง</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("4. ปฏิบัติตามเงื่อนไขในข้อตกลง")}} id="request" value="4. ปฏิบัติตามเงื่อนไขในข้อตกลง" onClick={clickrequest}>4. ปฏิบัติตามเงื่อนไขในข้อตกลง</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("5. เรียกร้องค่าเสียหาย")}} id="request" value="5. เรียกร้องค่าเสียหาย" onClick={clickrequest}>5. เรียกร้องค่าเสียหาย</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("6. แก้ไขให้ถูกต้อง")}} id="request" value="6. แก้ไขให้ถูกต้อง" onClick={clickrequest}>6. แก้ไขให้ถูกต้อง</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("7. ลดค่าใช้จ่าย/ ลดราคา")}} id="request" value="7. ลดค่าใช้จ่าย/ ลดราคา" onClick={clickrequest}>7. ลดค่าใช้จ่าย/ ลดราคา</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("8. ซ่อมแซมสินค้า")}} id="request" value="8. ซ่อมแซมสินค้า" onClick={clickrequest}>8. ซ่อมแซมสินค้า</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("9. ยุติข้อตกลง/สัญญา")}} id="request" value="9. ยุติข้อตกลง/สัญญา" onClick={clickrequest}>9. ยุติข้อตกลง/สัญญา</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("10. ยกเลิกการทำรายการ")}} id="request" value="10. ยกเลิกการทำรายการ" onClick={clickrequest}>10. ยกเลิกการทำรายการ</ListGroupItem>
                <ListGroupItem className="text-left"  style={{backgroundColor: myColor("11. อื่น ๆ")}} id="request" value="11. อื่น ๆ" onClick={clickrequest}>11. อื่น ๆ</ListGroupItem>
            </ListGroup>
        </div>
        </div>
      </div>
    </div>
   
</div> 
);


FormResponse.propTypes = {
  field: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  clickrequest : PropTypes.func.isRequired,
  myColor : PropTypes.func.isRequired
};

export default FormResponse;
