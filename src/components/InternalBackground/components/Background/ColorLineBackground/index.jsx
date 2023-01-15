import React from 'react';
import Proton from 'proton-engine';
import RAFManager from 'raf-manager';
import Canvas from './Canvas';

class Particles extends React.Component {
  constructor(props) {
    super(props);
    this._mousedown = false;
    this.renderProton = this.renderProton.bind(this);
  }

  handleCanvasInited(canvas) {
    this.createProton(canvas);
    RAFManager.add(this.renderProton);
  }

  componentWillUnmount() {
    try {
      RAFManager.remove(this.renderProton);
      this.proton.destroy();
    } catch (e) {}
  }

  createProton(canvas) {
    const proton = new Proton();
    const emitter = new Proton.Emitter();
    emitter.damping = 0.008;
    emitter.rate = new Proton.Rate(250);

    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Radius(4));
    emitter.addInitialize(
      new Proton.Velocity(
        new Proton.Span(1.5),
        new Proton.Span(0, 360),
        'polar',
      ),
    );

    this.mouseInfo = {
      x: 1003 / 2,
      y: 610 / 2,
    };
    this.attractionBehaviour = new Proton.Attraction(this.mouseInfo, 0, 0);
    this.crossZoneBehaviour = new Proton.CrossZone(
      new Proton.RectZone(0, 0, canvas.width, canvas.height),
      'cross',
    );
    emitter.addBehaviour(new Proton.Color('random'));
    emitter.addBehaviour(this.attractionBehaviour, this.crossZoneBehaviour);
    emitter.addBehaviour(new Proton.RandomDrift(10, 10, 0.05));

    emitter.p.x = canvas.width / 2;
    emitter.p.y = canvas.height / 2;
    emitter.emit('once');
    proton.addEmitter(emitter);

    const renderer = this.createRenderer(canvas);
    proton.addRenderer(renderer);

    this.proton = proton;
    this.renderer = renderer;
  }

  createRenderer(canvas) {
    const context = canvas.getContext('2d');
    const renderer = new Proton.CanvasRenderer(canvas);

    renderer.onProtonUpdate = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.02)';
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    renderer.onParticleUpdate = (particle) => {
      context.beginPath();
      context.strokeStyle = particle.color;
      context.lineWidth = 1;
      context.moveTo(particle.old.p.x, particle.old.p.y);
      context.lineTo(particle.p.x, particle.p.y);
      context.closePath();
      context.stroke();
    };

    return renderer;
  }

  handleResize(width, height) {
    this.crossZoneBehaviour.reset(
      new Proton.RectZone(0, 0, width, height),
      'cross',
    );

    this.renderer.resize(width, height);
  }

  handleMouseDown(e) {
    this._mousedown = true;
    this.attractionBehaviour.reset(this.mouseInfo, 10, 1200);
    this.handleMouseMove(e);
  }

  handleMouseMove(e) {
    if (this._mousedown) {
      var _x, _y;
      if (e.pageX || e.pageX === 0) {
        _x = e.pageX;
        _y = e.pageY;
      } else if (e.offsetX || e.offsetX === 0) {
        _x = e.offsetX;
        _y = e.offsetY;
      }

      this.mouseInfo.x = _x;
      this.mouseInfo.y = _y;
    }
  }

  handleMouseUp(e) {
    this._mousedown = false;
    this.attractionBehaviour.reset(this.mouseInfo, 0, 0);
  }

  renderProton() {
    this.proton.update();
    this.proton.stats.update(2);
  }

  render() {
    return (
      <Canvas
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onCanvasInited={this.handleCanvasInited.bind(this)}
        onResize={this.handleResize.bind(this)}
      />
    );
  }
}

export default Particles;
