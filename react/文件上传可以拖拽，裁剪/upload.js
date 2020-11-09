import React from 'react';
import ReactDOM from 'react-dom';
import './upload.css';

export default class Image extends React.Component {
  imgRef = React.createRef();
  canvasRef = React.createRef();
  avtaImage = React.createRef();
  state = {
    file: null,
    dataUrl: '',
    times: 1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    startDrag: false,
    avtaDataUrl: ''
  }
  componentDidMount () {
  }
  handleChange = (event) => {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (event) => {

      this.setState({
        file,
        dataUrl: event.target.result
      })
      this.imgRef.current.onload = () => this.drawImage()
    }
    fileReader.readAsDataURL(file)
  }
  bigImage = () => {
    this.setState({
      times: this.state.times + 0.1
    }, () => this.drawImage())
  }
  smallImage = () => {
    this.setState({
      times: this.state.times - 0.1
    }, () => this.drawImage())
  }
  clipImage = (event) => {
    let canvas = this.canvasRef.current;
    let ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(100, 100, 100, 100);
    let avatarCanvas = document.createElement('canvas');
    avatarCanvas.width = 100;
    avatarCanvas.height = 100;
    let avatarCtx = avatarCanvas.getContext('2d');
    avatarCtx.putImageData(imageData, 0, 0); //0 0x，y
    let avtaDataUrl = avatarCanvas.toDataURL(); //转成base64url地址
    this.setState({
      avtaDataUrl
    })
    this.avtaImage.current.src = avtaDataUrl;


  }
  onMouseDown = (event) => {
    this.setState({
      startX: event.clientX,
      startY: event.clientY,
      startDrag: true,
    })

  }
  onMouseMove = (event) => {
    if (this.state.startDrag) {
      this.drawImage(event.clientX - this.state.startX + this.state.lastX, event.clientY - this.state.startY + this.state.lastY)
    }

  }
  onMouseUp = (event) => {
    this.setState({
      startDrag: false,
      lastX: (event.clientX - this.state.startX) + this.state.lastX,
      lastY: (event.clientY - this.state.startY) + this.state.lastY,

    })
  }
  drawImage = (left = this.state.lastX, top = this.state.lastY) => {
    let image = this.imgRef.current;
    let canvas = this.canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let imageWidth = image.width;
    let imageHeight = image.height;
    if (imageWidth > imageHeight) {
      let scale = canvas.width / imageWidth;
      imageWidth = canvas.width * this.state.times;
      imageHeight = canvas.height * scale * this.state.times
    } else {
      let scale = canvas.height / imageHeight;
      imageHeight = canvas.height * this.state.times;
      imageWidth = canvas.width * scale * this.state.times
    };
    ctx.drawImage(image, (canvas.width - imageWidth) / 2 + left, (canvas.height - imageHeight) / 2 + top, imageWidth, imageHeight);
  }
  uploadImage = (event) => {
    console.log(this.state.avtaDataUrl);

    let bytes = atob(this.state.avtaDataUrl.split(',')[1]);
    console.log('bytes', bytes)
    let arrayBuffer=new ArrayBuffer(bytes.length);
    let unit8Array=new Uint8Array();
    console.log('unit8Array', unit8Array);
    for(var i =0;i<bytes.length;i++){
      unit8Array[i]=bytes.charCodeAt(i)
    }
    let blob=new Blob([arrayBuffer],{type:'image/png'});
    console.log('blob',blob)



  }


  render () {
    const { dataUrl, file } = this.state
    return (<div className='wrap'>
      <div className='uploadWrap'>
        <input accept="image/png/jpg" type='file' onChange={this.handleChange} />
      </div>
      {
        file && (
          <div className='imageWrap'>
            <img src={dataUrl} ref={this.imgRef} />
          </div>
        )
      }
      {file && (<div className='canvasWrap' onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}>

        <div className='wrap1'>
          <div className='innerWrap'> <canvas
            width="300px" height="500px"
            ref={this.canvasRef}
          ></canvas>
            <div style={{
              position: 'absolute',
              left: '100px',
              top: '100px',
              width: '100px',
              height: '100px',
              background: 'yellow',
              opacity: 0.3
            }}>  </div>
          </div>

          <button onClick={this.bigImage}>放大</button>
          <button onClick={this.smallImage}>缩小</button>
          <button onClick={this.clipImage}>裁剪</button>
        </div>


      </div>
      )}

      {file && (
        <div className='imgWrap1'>
          <div>
            <img ref={this.avtaImage} />
            <button onClick={this.uploadImage}>上传</button>
          </div>
        </div>
      )}





    </div>)
  }

}