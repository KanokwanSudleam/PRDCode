import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';


const FormPayment = ({field,change,web,store,date,valueDate,error}) => (

<div>
    <div className="container">
        {/* <h2>Tell us about your purchase from {field.accountname}</h2> */}
        <div className="form-group row">
            <label for="productname" className="col-12 col-sm-12 col-form-label">ชื่อสินค้า/บริการ<span className="font-red"> *</span></label>
            <div className="col-12 col-sm-12">
                <input type="text" className="form-control" id="productname" placeholder="ยี่ห้อหรือรุ่นของสินค้าที่ซื้อ / ชื่อบริการที่ใช้" value={field.productname} onChange={change} required/>
            </div>
	    <div className="col-12 col-sm-12">
                {error.productname?(
                    <p id='err_productname' className="font-red">โปรดกรอกข้อมูล</p>                    
                ):(
                    <p id='err_productname' style={{display:'none'}}>โปรดกรอกข้อมูล</p>                    
                )}
            </div>
        </div>
        <div className="form-group row">
            <label for="ddlpayment" className="col-12 col-sm-12 col-form-label">วิธีการชำระเงิน<span className="font-red"> *</span></label>
            <div className="col-12 col-sm-12">
                <div class="form-group">
                    <select className="form-control" id="payment" value={field.payment} onChange={change} required>
                        <option value=""></option>
                        <option>1. เงินสด</option>
                        <option>2. บัตรเครดิต</option>
                        <option>3. บัตรเดบิต</option>
                        <option>4. โอนเงิน</option>
                        <option>5. ไม่เสียค่าใช้จ่าย</option>
                    </select>
                </div>
            </div>
            <div className="col-12 col-sm-12">
                {error.payment?(
                    <p id='err_payment' className="font-red">โปรดกรอกข้อมูล</p>                    
                ):(
                    <p id='err_payment' style={{display:'none'}}>โปรดกรอกข้อมูล</p>                    
                )}
            </div>
        </div>
        <div className="form-group row">
            <label for="productpric" className="col-12 col-sm-12 col-form-label">ราคา<span className="font-red"> *</span></label>
            <div className="col-12 col-sm-12">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">฿</span>
                    </div>
                    <input type="number" className="form-control" id="productprice" placeholder="มูลค่าที่ซื้อสินค้าหรือบริการ" value={field.productprice} onChange={change} required/>
                </div>
            </div>
            <div className="col-12 col-sm-12">
            {error.productprice?(
                    <p id='err_productprice' className="font-red">โปรดกรอกข้อมูล</p>                    
                ):(
                    <p id='err_productprice' style={{display:'none'}}>โปรดกรอกข้อมูล</p>                                        
                )}
            </div>
        </div>
        <div className="form-group row">
            <label for="ddlchannel" className="col-12 col-sm-12 col-form-label">ช่องทางการซื้อสินค้า/บริการ<span className="font-red"> *</span></label>
            <div className="col-12 col-sm-12">
                <div class="form-group">
                    <select className="form-control" id="purchase" value={field.purchase} onChange={change} required>
                        <option value=""></option>
                        <option>1. ห้างฯ/ร้านค้า/หน่วยงาน/สาขา</option>
                        <option>2. ตลาด</option>
                        <option>3. ขายตรง/ตัวเเทนจำหน่าย</option>
                        <option>4. เว็บไซต์</option>
                        <option>5. โซเชียลมีเดีย (เฟสบุ๊ค/ไลน์/อินสตราเเกรม)</option>
                        <option>6. โทรศัพท์</option>                    
                    </select>
                </div>
            </div>
            <div className="col-12 col-sm-12">
                {error.purchase?(
                        <p id='err_purchase'  className="font-red">โปรดกรอกข้อมูล</p>                    
                    ):(
                        <p id='err_purchase' style={{display:'none'}}>โปรดกรอกข้อมูล</p>                                        
                    )}
            </div>
        </div>
        {store?(    
        <div className="form-group row">
            <label for="store" className="col-12 col-sm-12 col-form-label">ชื่อร้านค้า/องค์กร/หน่วยงาน<span className="font-red"> *</span></label>
            <div className="col-12 col-sm-12">
                <input type="text" className="form-control" id="store" placeholder="ชื่อสาขาร้านค้า/องค์กร/หน่วยงาน" value={field.store} onChange={change} required/>
            </div>
	   <div className="col-12 col-sm-12">
                {error.store?(
                        <p id='err_store'  className="font-red">โปรดกรอกข้อมูล</p>                    
                    ):(
                        <p id='err_store' style={{display:'none'}}>โปรดกรอกข้อมูล</p>                                        
                    )}
            </div>     
        </div>
        ):null}
        {web ? (
        <div className="form-group row">
            <label for="website" className="col-12 col-sm-12 col-form-label">Website Address<span className="font-red"> *</span></label>
            <div className="col-12 col-sm-12">
                <input type="text" className="form-control" id="website"  value={field.website} onChange={change} required/>
            </div>
	   <div className="col-12 col-sm-12">
                {error.website?(
                        <p id='err_website'  className="font-red">โปรดกรอกข้อมูล</p>                    
                    ):(
                        <p id='err_website' style={{display:'none'}}>โปรดกรอกข้อมูล</p>                                        
                    )}
            </div> 
        </div>
        ):null}
        <div className="form-group row">
            <label for="purchasedate" className="col-12 col-sm-12 col-form-label">วันที่ซื้อสินค้า/เกิดเหตุการณ์<span className="font-red"> *</span></label>
            <div className="col-12 col-sm-12">
                <DatePicker hintText="Date" value={valueDate(field.purchasedate)} onChange={date}  required/>
                {/* <input type="text" className="form-control" id="purchasedate" 
                laceholder="24/10/2017" value={field.purchasedate} onChange={change} required/>
                <div className="invalid-feedback">
                    Please provide a purchasedate.
                </div> */}
            </div>
        </div>
    </div>
</div> 
);


FormPayment.propTypes = {
    field: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    date: PropTypes.func.isRequired,
    web: PropTypes.bool.isRequired,
    store: PropTypes.bool.isRequired,
    valueDate: PropTypes.func
};

export default FormPayment;
