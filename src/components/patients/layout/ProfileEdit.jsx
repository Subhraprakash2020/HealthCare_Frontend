import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Row, Col, Card, Button } from "react-bootstrap";
import { getCroppedImg } from "../../../utils/cropImage.js";
import "../../../css/profile.css";
import Header from "./Header.jsx";
import Footer from "../home/Footer.jsx";

function ProfileEdit() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);

      const croppedBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );

      const formData = new FormData();
      formData.append("file", croppedBlob);

      // 🔐 Example API call
      // await axios.post("/api/profile/upload", formData, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      // });

      alert("Profile image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="container mt-4">
        <Row>
          <Col md={4}>
            <Card className="p-3 text-center">
              <p className="text-muted fw-semibold">Profile Picture not set</p>

              <div className="avatar-wrapper mx-auto mb-3">
                <img
                  src={
                    imageSrc ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="profile"
                  className="avatar-img"
                />
              </div>

              <h6>Add Profile Picture</h6>

              <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                className="form-control mt-2"
                onChange={handleImageChange}
              />

              <small className="text-success d-block mt-2">
                Accepted Images:
              </small>
              <small className="text-muted">
                Gif, jpeg, or png images maximum upto 2MB
              </small>
            </Card>
          </Col>

          {/* RIGHT PANEL */}
          <Col md={8}>
            <Card className="p-4 preview-box">
              {!imageSrc ? (
                <div className="text-center text-muted">
                  <p>No Picture</p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt="empty"
                    className="preview-placeholder"
                  />
                </div>
              ) : (
                <>
                  {/* Cropper */}
                  <div className="crop-container">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  {/* Zoom */}
                  <div className="mt-3">
                    <label>Zoom</label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(e.target.value)}
                      className="form-range"
                    />
                  </div>

                  {/* Upload Button */}
                  <div className="text-end mt-3">
                    <Button
                      variant="success"
                      disabled={uploading}
                      onClick={handleUpload}
                    >
                      {uploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ProfileEdit;
