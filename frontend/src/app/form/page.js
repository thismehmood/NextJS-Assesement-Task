"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { getItem } from "@src/utils/localStorage";
import schema from "@src/utils/validationSchema";
import { API_BASE_URL } from "@src/utils/contants";

const MyFormComponent = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [maxCopies, setMaxCopies] = useState(1);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      Modal.error({
        title: "Error",
        content: "Upload Images is required.",
      });
      return;
    }
    if (fileList.length > maxCopies) {
      Modal.error({
        title: "Error",
        content: `You can only upload up to ${maxCopies} images.`,
      });
      return;
    }

    const formData = new FormData();
    formData.append("carModel", values.carModel);
    formData.append("price", values.price);
    formData.append("phone", values.phone);
    formData.append("city", values.city);
    formData.append("copies", values.copies);
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    const token = getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/data/document`,
        formData,
        config
      );
      if (response.status === 200) {
        message.success("Form submitted successfully!");
      }
    } catch (error) {
      message.error(`Error saving data: ${error}`);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const yupSync = {
    async validator({ field }, value) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 24 },
  };
  return (
    <>
      <Form
        {...layout}
        layout="horizontal"
        style={{
          maxWidth: "100%",
        }}
        onFinish={onFinish} // Added onFinish handler
      >
        <Form.Item label="Car Model:" name="carModel" rules={[yupSync]}>
          <Input onFocus={() => {}} />
        </Form.Item>
        <Form.Item label="Price:" name="price" rules={[yupSync]}>
          <Input />
        </Form.Item>
        <Form.Item label="Phone:" name="phone" rules={[yupSync]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="City:"
          name="city"
          rules={[{ required: true, message: "Please select city!" }]}
        >
          <Radio.Group>
            <Radio value="Lahore"> Lahore </Radio>
            <Radio value="Karachi"> Karachi </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="No of copies:"
          name="copies"
          rules={[
            { required: true, message: "Please select number of copies!" },
          ]}
        >
          <Select onChange={(value) => setMaxCopies(value)}>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
            <Select.Option value="5">5</Select.Option>
          </Select>
        </Form.Item>

        <br />
        <Form.Item
          label="Upload Images"
          name="files"
          valuePropName="fileList"
          getValueFromEvent={handleFileChange}
        >
          <Upload
            name="images"
            accept="image/*"
            listType="picture-card"
            beforeUpload={() => false}
            fileList={fileList}
            multiple
          >
            <UploadOutlined />
          </Upload>
        </Form.Item>

        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default () => <MyFormComponent />;
