import React, { useEffect, useState } from "react";
import { ListNews, ListNewsContent, ListNewsDate, ListNewsImg, ListNewsTittle, NewsContent, NewsDate, NewsLeftImg, NewsRightImg, NewsTittle, SubMenuType, WrapperListNews, WrapperListNewsTittle, WrapperRowNews, WrapperSubMenuType, WrapperType, WrapperTypeProduct } from "./style";
import iconMenu1 from '../../assets/images/icons8-home-24.png';
import iconMenu2 from '../../assets/images/icons8-phone-case-50.png';
import iconMenu3 from '../../assets/images/icons8-sort-down-24.png';
import iconMenu4 from '../../assets/images/icons8-news-30.png';
import imgNews1 from '../../assets/images/samsung-galaxy-z-flip6-didongmy.jpg';
import imgNews2 from '../../assets/images/km apple.jpg';
import imgNews3 from '../../assets/images/km samsung.jpg';
import imgNews4 from '../../assets/images/km phu kien.jpg';
import imgListNews1 from '../../assets/images/thumuasac.jpg';
import imgListNews2 from '../../assets/images/listnews2.jpg';
import imgListNews3 from '../../assets/images/listnews3.png';
import imgListNews4 from '../../assets/images/listnews4.jpg';
import imgListNews5 from '../../assets/images/listnews5.png';
import imgListNews6 from '../../assets/images/listnews6.png';
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { useNavigate } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { Col, Row } from "antd";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const NewsPage = () => {
    const navigate = useNavigate()
    const [typeProducts, setTypeProducts] = useState([])

    const handleNavigateNews = () => {
        navigate('/news')
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    return (
        <div style={{ width: '100%', background: '#efefef' }}>
            <div style={{ width: '100%', margin: '0 auto', background: '#183544' }}>
                <WrapperTypeProduct>
                    <WrapperType onClick={() => navigate('/')}>
                        <img style={{ width: '18px', height: '18px', position: 'absolute', left: '3px', top: '13px' }} src={iconMenu1} alt="iconMenu1" />
                        <span style={{ paddingLeft: '5px' }}>Trang Chủ</span>
                    </WrapperType>
                    <WrapperSubMenuType>
                        <img style={{ width: '16px', height: '16px', position: 'absolute', left: '3px', top: '13px' }} src={iconMenu2} alt="iconMenu2" />
                        <span style={{ paddingLeft: '5px' }}>Điện Thoại</span>
                        <img style={{ width: '22px', height: '22px', position: 'absolute', right: '0', top: '10px' }} src={iconMenu3} alt="iconMenu3" />
                        <SubMenuType className="subMenuType">
                            {typeProducts.map((item) => {
                                return (
                                    <TypeProduct name={item} key={item} />
                                )
                            })}
                        </SubMenuType>
                    </WrapperSubMenuType>
                    <WrapperType onClick={handleNavigateNews}>
                        <img style={{ width: '16px', height: '16px', position: 'absolute', left: '3px', top: '13px' }} src={iconMenu4} alt="iconMenu4" />
                        <span style={{ paddingLeft: '5px' }}>Tin Tức</span>
                    </WrapperType>
                </WrapperTypeProduct >
            </div>
            <div style={{ width: '100%', background: '#efefef' }}>
                <WrapperRowNews>
                    <Col span={11}>
                        <NewsLeftImg src={imgNews1} alt="imgNews1" />
                    </Col>
                    <Col span={7}>
                        <NewsTittle>Mua Samsung Galaxy Z Fold6 và Z Flip6 ở đâu?</NewsTittle>
                        <NewsDate>06/01/2024</NewsDate>
                        <NewsContent>Z Flip 6 trước đây được cho là sẽ có các màu Xanh nhạt, Xanh lá nhạt,
                            Bạc, Vàng và các tùy chọn này vẫn được leaker xác nhận. Tuy nhiên,
                            Young làm rõ ràng hơn các tùy chọn Xanh lá nhạt sẽ được gọi là “Mint”,
                            trong khi phiên bản màu bạc có thể sẽ được gọi
                        </NewsContent>
                    </Col>
                    <Col span={6} style={{ paddingLeft: '21px' }}>
                        <NewsRightImg src={imgNews2} alt="imgNews2" />
                        <NewsRightImg src={imgNews3} alt="imgNews3" />
                        <NewsRightImg src={imgNews4} alt="imgNews4" />
                    </Col>
                </WrapperRowNews>
                <WrapperListNews>
                    <ListNews>
                        <ListNewsImg src={imgListNews1} alt="imgListNews1" />
                        <ListNewsTittle>Thu sạc cũ đổi sạc mới, tiết kiệm tới 500.000đ</ListNewsTittle>
                        <WrapperListNewsTittle>
                            <ListNewsContent>Những chiếc củ, cáp sạc cũ, hỏng, hàng nhái,... chưa bao giờ có giá trị đến thế khi tham gia
                                chương trình “Thu sạc cũ, đổi sạc mới” của Tablet Plaza. Quý khách chỉ cần mang chúng qua hệ
                                thống cửa hàng Tablet Plaza trên toàn quốc để được đổi sang chiếc củ,
                            </ListNewsContent>
                        </WrapperListNewsTittle>
                        <ListNewsDate>10/04/2024</ListNewsDate>
                    </ListNews>
                    <ListNews>
                        <ListNewsImg src={imgListNews2} alt="imgListNews2" />
                        <ListNewsTittle>Miếng Dán Màn Hình Kaizen: Sự Bảo Vệ Tối Ưu Cho Điện Thoại Của Bạn</ListNewsTittle>
                        <WrapperListNewsTittle>
                            <ListNewsContent>Bạn đang tìm kiếm một giải pháp hoàn hảo để bảo vệ chiếc smartphone của mình mà
                                không làm mất đi vẻ đẹp của thiết bị? Hãy để chúng tôi giới thiệu đến bạn miếng dán màn hình
                                Kaizen - "Siêu Đỉnh" đến từ Tablet Plaza!
                            </ListNewsContent>
                        </WrapperListNewsTittle>
                        <ListNewsDate>19/09/2024</ListNewsDate>
                    </ListNews>
                    <ListNews>
                        <ListNewsImg src={imgListNews3} alt="imgListNews3" />
                        <ListNewsTittle>MUA SẮM CUỐI TUẦN - TƯNG BỪNG HÀNG RẺ</ListNewsTittle>
                        <WrapperListNewsTittle>
                            <ListNewsContent>Nếu như giữa tuần mải mê với công việc mà bỏ lỡ những deal to,
                                khuyến mãi lớn thì nhớ lên lịch “quẹo lựa” đến Tablet Plaza để có cơ hội sở
                                hữu các sản phẩm cực xịn mà giá siêu tiết kiệm. Tablet Plaza đang có chương
                                trình săn sale cuối tuần với vô vàn deal
                            </ListNewsContent>
                        </WrapperListNewsTittle>
                        <ListNewsDate>05/02/2024</ListNewsDate>
                    </ListNews>
                    <ListNews>
                        <ListNewsImg src={imgListNews4} alt="imgListNews4" />
                        <ListNewsTittle>Cách xem trực tiếp sự kiện Galaxy Unpacked 2024 ra mắt Galaxy S24 Series
                        </ListNewsTittle>
                        <WrapperListNewsTittle>
                            <ListNewsContent>Samsung sẽ giới thiệu dòng Galaxy S24 mới trong sự kiện Galaxy Unpacked 2024 diễn ra 1h sáng ngày 18/1
                                . Samsung sẽ tổ chức sự kiện Unpacked 2024 ra mắt điện thoại Galaxy mới vào 1h sáng ngày
                                18/1 tại trung tâm SAP, San Jos
                            </ListNewsContent>
                        </WrapperListNewsTittle>
                        <ListNewsDate>17/01/2024</ListNewsDate>
                    </ListNews>
                    <ListNews>
                        <ListNewsImg src={imgListNews5} alt="imgListNews5" />
                        <ListNewsTittle>GIỜ VÀNG GIÁ SỐC 26.06</ListNewsTittle>
                        <WrapperListNewsTittle>
                            <ListNewsContent>Cùng Phone Plaza đón Siêu Sale " Giờ Vàng Giá Sốc " với hàng loạt ưu đãi dành cho các sản phẩm điện thoại Apple,
                                Samsung, Laptop, máy tính bảng, đồng hồ thông minh, phụ kiện. Ngày 26.06.2023 hãy nhanh chân đến Tablet Plaza gần bạn để sở hữu ngay
                            </ListNewsContent>
                        </WrapperListNewsTittle>
                        <ListNewsDate>05/08/2024</ListNewsDate>
                    </ListNews>
                    <ListNews>
                        <ListNewsImg src={imgListNews6} alt="imgListNews6" />
                        <ListNewsTittle>SĂN SALE CUỐI TUẦN – TƯNG BỪNG GIÁ TỐT</ListNewsTittle>
                        <WrapperListNewsTittle>
                            <ListNewsContent>Đến Phone Plaza săn sale cuối tuần với hàng loạt ưu đãi dành tặng cho khách hàng.
                            </ListNewsContent>
                        </WrapperListNewsTittle>
                        <ListNewsDate>05/02/2024</ListNewsDate>
                    </ListNews>
                </WrapperListNews>
            </div>
            <div style={{ width: '100%', backgroundColor: '#efefef', display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                <FooterComponent />
            </div>
        </div >
    );
};

export default NewsPage