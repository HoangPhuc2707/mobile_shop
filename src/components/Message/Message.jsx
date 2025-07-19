import { message } from "antd"

const success = (mes = 'Thành công') => {
    message.success(mes);
};

const error = (mes = 'Thất bại') => {
    message.error(mes);
};

const warning = (mes = 'Cảnh báo!') => {
    message.warning(mes);
};

export { success, error, warning }