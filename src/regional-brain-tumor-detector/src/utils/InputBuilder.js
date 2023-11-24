import { Tensor } from "onnxruntime-web";

const EXPECTED_WIDTH = 224;
const EXPECTED_HEIGHT = 224;
const EXPECTED_CHANNELS = 3;// RGB

class InputBuilder {
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

    buildFromImage(image) {
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
        const feeds = { data: inputTensor }
        return feeds
    }
}

export default InputBuilder