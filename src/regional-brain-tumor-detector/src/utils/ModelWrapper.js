import { Tensor } from "onnxruntime-web";
import { InferenceSession } from "onnxruntime-web";

// models
import BrainTumorSegmentationModel from "../models/sample_brain_tumor_segmentation_model.onnx";

// change based on model
const EXPECTED_WIDTH = 512;
const EXPECTED_HEIGHT = 512;
const EXPECTED_CHANNELS = 1;

class Model {
    static session = null

    #createImageData(image) {
        const canvas = document.createElement("canvas")
        canvas.width = EXPECTED_WIDTH
        canvas.height = EXPECTED_HEIGHT
        const context = canvas.getContext("2d")
        context.drawImage(image, 0, 0, EXPECTED_WIDTH, EXPECTED_HEIGHT)
        return context.getImageData(0, 0, EXPECTED_WIDTH, EXPECTED_HEIGHT)
    }
    
    #createInputArray(imageData) {
        const size = EXPECTED_WIDTH * EXPECTED_HEIGHT * EXPECTED_CHANNELS
        const inputArray = new Float32Array(size)
        for (const i of inputArray) {
            inputArray[i] = imageData.data[i] / 255.0;
        }
        return inputArray
    }
    
    #createTensor(inputArray) {
        return new Tensor("float32", inputArray, [1, EXPECTED_CHANNELS, EXPECTED_WIDTH, EXPECTED_HEIGHT])
    }

    ready() {
        return (Model.session !== null)
    }
    
    async load() {
        Model.session = await InferenceSession.create(
            BrainTumorSegmentationModel,
            { executionProviders: ["webgl"], }
        )
    }

    async run(image) {
        if(!this.ready()) {
            return new Error("ERR: model has not been loaded yet")
        }

        const feeds = this.buildInput(image)
        return await Model.session.run(feeds)
    }


    buildInput(image) {
        if(!image.width || !image.height) {
            return new Error("ERR: cannot check dimension of image")
        }
        
        if(!(image.width === EXPECTED_WIDTH && image.height === EXPECTED_HEIGHT)) {
            const message = `ERR: dimension of image has to be ${EXPECTED_WIDTH} x ${EXPECTED_HEIGHT}`
            return new Error(message)
        }

        const imageData = this.#createImageData(image)
        const inputArray = this.#createInputArray(imageData)
        const inputTensor = this.#createTensor(inputArray)
        const feeds = { 'input.1': inputTensor } // change based on model
        return feeds
    }

    displayOutput(tensor, canvas) {
        const context = canvas.getContext('2d')
        const outputArray = new Uint8ClampedArray(EXPECTED_WIDTH * EXPECTED_HEIGHT * 4)
        const rawdata = tensor.data;

        for(var y = 0; y < EXPECTED_HEIGHT; y++) {
            for(var x = 0; x < EXPECTED_WIDTH; x++) {
                const posInTensor = y * EXPECTED_WIDTH + x
                var posInArray = posInTensor * 4
                
                const pixel = rawdata[posInTensor] < 1e-12 ? 0 : 255
                outputArray[posInArray  ] = pixel     // R value [0, 255]
                outputArray[posInArray+1] = pixel     // G value
                outputArray[posInArray+2] = pixel     // B value
                outputArray[posInArray+3] = 255;      // alpha channel
            }
        }

        const imageData = new ImageData(outputArray, EXPECTED_WIDTH, EXPECTED_HEIGHT)
        // console.log(imageData)

        context.putImageData(imageData, 0, 0);
    }
}

export default Model