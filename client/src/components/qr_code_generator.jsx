import React from "react";
import QRCode from "qrcode";

class QRCodeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeInfo: false,
    };
  }

  generateQR = () => {
    const { id, name } = this.props;
    let specialInfo = `Promo Code ${id}: ${name}. Only 1 voucher per table. Valid until 30/09/2020.`;

    QRCode.toCanvas(document.getElementById("canvas"), specialInfo, function (
      error
    ) {
      if (error) console.error(error);
    });

    this.setState({
      qrCodeInfo: true,
    });
  };

  render() {
    const { qrCodeInfo } = this.state;
    return (
      <div align="center">
        <button className="button-special" onClick={this.generateQR}>
          I want it!
        </button>

        <div align="center">
          {qrCodeInfo && (
            <div>
              <h3>Redeem your special at the restaurant with this code:</h3>
            </div>
          )}
          <canvas id="canvas" />
        </div>
      </div>
    );
  }
}

export default QRCodeGenerator;
