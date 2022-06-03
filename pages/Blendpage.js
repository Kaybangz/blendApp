import Layout from "../components/Layout";
import React, { useState } from "react";
import { Input, Button, Loading } from "@nextui-org/react";
import blendpageStyle from "../styles/Blendpage.module.css";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const Blendpage = () => {
  const [image, setImage] = useState({});
  const [audio, setAudio] = useState({});
  const [video, setVideo] = useState("");

  const [loading, setLoading] = useState(false);

  const ffmpeg = createFFmpeg({
    log: true,
  });

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  const handleAudioChange = (e) => {
    const audioFile = e.target.files[0];
    setAudio(audioFile);
  };

  const blendFunc = async () => {
    await ffmpeg.load();
    setLoading(true);
    ffmpeg.FS("writeFile", "image.jpg", await fetchFile(image));
    ffmpeg.FS("writeFile", "audio.mp3", await fetchFile(audio));

    await ffmpeg.run(
      "-framerate",
      "1/10",
      "-i",
      "image.jpg",
      "-i",
      "audio.mp3",
      "-c:v",
      "libx264",
      "-t",
      "60",
      "-pix_fmt",
      "yuv420p",
      "-vf",
      "scale=1920:1080",
      "output.mp4"
    );

    const videoData = ffmpeg.FS("readFile", "output.mp4");

    setVideo(
      URL.createObjectURL(new Blob([videoData.buffer], { type: "video/mp4" }))
    );

    setLoading(false);
  };

  return (
    <main className={blendpageStyle.main_wrapper}>
      <Layout>
        <section className={blendpageStyle.main_container}>
          <aside className={blendpageStyle.leftAside}>
            <div className={blendpageStyle.imageInputContainer}>
              <Input
                type="file"
                size="lg"
                label="Choose Image file"
                clearable
                bordered
                color="secondary"
                shadow={true}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className={blendpageStyle.audioInputContainer}>
              <Input
                type="file"
                size="lg"
                label="Choose Audio file"
                clearable
                bordered
                color="secondary"
                shadow={true}
                accept="audio/*"
                onChange={handleAudioChange}
              />
            </div>

            <div>
              <Button
                size="lg"
                color="secondary"
                shadow={true}
                ghost
                css={{ fontFamily: "Roboto Slab", fontSize: "1.2rem" }}
                onClick={blendFunc}
              >
                {loading && (
                  <Loading
                    type="spinner"
                    color="currentColor"
                    size="md"
                    css={{ px: "$1" }}
                  />
                )}
                {
                    loading ? "Processing" : "Start blending"
                }
              </Button>
            </div>
          </aside>

          <aside className={blendpageStyle.rightAside}>
            <h2 color="secondary">Your Video</h2>
            {video && <video src={video} controls />}
          </aside>
        </section>
      </Layout>
    </main>
  );
};

export default Blendpage;
