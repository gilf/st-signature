import { flush, render } from '@stencil/core/testing';
import { Signature } from './st-signature';

describe('st-signature', () => {
  it('should build', () => {
    expect(new Signature()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [Signature],
        html: '<st-signature></st-signature>'
      });
    });

    it('should work without parameters', () => {
      expect(element.querySelector('canvas').outerHTML).toEqual('<canvas style="border: 2px solid black; height: 300px; width: 300px;"></canvas>');
    });

    it('should work with a label', async () => {
      element.label = 'Signature';
      await flush(element);
      expect(element.querySelector('.signature-label').textContent).toEqual('Signature');
    });

    it('should work with width', async () => {
      element.width = '200';
      await flush(element);
      expect(element.querySelector('canvas').style.width).toEqual('200px');
    });

    it('should work with height', async () => {
      element.height = '100';
      await flush(element);
      expect(element.querySelector('canvas').style.height).toEqual('100px');
    });
  });
});
