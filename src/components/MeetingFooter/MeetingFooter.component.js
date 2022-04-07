import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { examFlag, setExamFlag } from "../../server/firebase";
import { Player } from 'video-react'
 
import RecordRTC, {
  RecordRTCPromisesHandler,
} from 'recordrtc'
import { saveAs } from 'file-saver'
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faMicrophoneSlash,
  faPhoneSlash,
  faCaretSquareDown,
  faCircleNotch,
  faCircle
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./MeetingFooter.css";
const MeetingFooter = (props) => {
  console.log(examFlag)
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
    record: false
  });
  const [recorder, setRecorder] = useState()
  const [stream, setStream] = useState()
  const [videoBlob, setVideoUrlBlob] = useState()
  
  const startRecording = async () => {
    const mediaDevices = navigator.mediaDevices
    const stream = await mediaDevices.getDisplayMedia({
            video: true,
            audio: false,
          })
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: 'video',
    })

    await recorder.startRecording()
    setRecorder(recorder)
    setStream(stream)
    setVideoUrlBlob(null)
  }

  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording()
      const blob = await recorder.getBlob();
      stream.stop()
      setVideoUrlBlob(blob)
      setStream(null)
      setRecorder(null)
    }
  }

  const downloadVideo = () => {
    if (videoBlob) {
      saveAs(videoBlob, `Video-${Date.now()}.webm`)
    }
  }

  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };
  const onRecordClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        record: !currentState.record,
      };
    });
    !streamState.record ? startRecording() : stopRecording()
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !examFlag ? !currentState.video : !(!currentState.video),
      };
    });
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const onCallDisconnectClick = () => {
    window.location.reload();
  };

  const setScreenState = (isEnabled) => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };
  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);
  return (
    <div className="meeting-footer">
      <div
        className={"meeting-icons " + (!streamState.mic ? "active" : "")}
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      >
        <FontAwesomeIcon
          icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
          title="Mute"
        />
      </div>
      <div
        className={"meeting-icons " + (!streamState.video ? "active" : "")}
        data-tip={streamState.video ? "Hide Video" : "Show Video"}
        onClick={onVideoClick}
      >
        <FontAwesomeIcon icon={!streamState.video ? faVideo : faVideoSlash} />
      </div>
      <div
        className="meeting-icons"
        data-tip="Share Screen"
        onClick={onScreenClick}
        disabled={streamState.screen}
      >
        <FontAwesomeIcon icon={faDesktop} />
      </div>
      <div
        className="meeting-icons"
        data-tip="End Call"
        onClick={onCallDisconnectClick}
        disabled={streamState.screen}
      >
        <FontAwesomeIcon icon={faPhoneSlash} />
      </div>

      <div
        className={"meeting-icons " + (!streamState.record? "" : "active")}
        data-tip={streamState.record ? "Stop Recording" : "Start Recording"}
        onClick={onRecordClick}
      >
        <FontAwesomeIcon icon={!streamState.record ? faCircle : faCircleNotch} />
      </div>
      
      <div
        className={"meeting-icons"}
        data-tip={"Download Video"}
        onClick={downloadVideo}
        disabled={!videoBlob}
      >
        <FontAwesomeIcon icon={faCaretSquareDown} />
      </div>

      <ReactTooltip />
    </div>
  );
};

export default MeetingFooter;
