import React from 'react'
import './SortingVisualizer.css'

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    generateArray() {
        let container = document.getElementById("array");
        let parent = container.parentElement;
        container.parentElement.removeChild(container);
        let newContainer = document.createElement("div");
        newContainer.id = "array";
        parent.append(newContainer);

        for (let i = 0; i < 20; i++) {
            let value = Math.ceil(Math.random() * 100);
            let array_ele = document.createElement("div");
            array_ele.classList.add("block");
            array_ele.style.height = `${value * 3}px`;
            array_ele.style.transform = `translate(${i * 30}px)`;
            let array_ele_label = document.createElement("label");
            array_ele_label.classList.add("block_id");
            array_ele_label.innerText = value;

            array_ele.appendChild(array_ele_label);
            newContainer.appendChild(array_ele);
        }
    }

    async swap(el1, el2) {
        let container = document.getElementById("array");
        return new Promise((resolve) => {
  
            let temp = el1.style.transform;
            el1.style.transform = el2.style.transform;
            el2.style.transform = temp;
      
            window.requestAnimationFrame(function() {
                setTimeout(() => {
                    container.insertBefore(el2, el1);
                    resolve();
                }, 150);
            });
        });
    }

    async BubbleSort(delay = 50) {
        let blocks = document.querySelectorAll(".block");
        for (let i = 0; i < blocks.length; i++) {
            for (let j = 0; j < blocks.length - i - 1; j++) {
                blocks[j].style.backgroundColor = "#FF4949";
                blocks[j + 1].style.backgroundColor = "#FF4949";

                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, delay)
                );
                let value1 = Number(blocks[j].childNodes[0].innerHTML);
                let value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
                if (value1 > value2) {
                    await this.swap(blocks[j], blocks[j + 1]);
                    blocks = document.querySelectorAll(".block");
                }
                blocks[j].style.backgroundColor = "lightyellow";
                blocks[j + 1].style.backgroundColor = "lightyellow";
            }
      
            blocks[blocks.length - i - 1]
                    .style.backgroundColor = "#13CE66";
        }
    
    }

    render() {
        const {array} = this.state;
        return(
            <div>
                <br/><br/>
                <div className='welcome-container'>
                    <div id="welcome">
                        <b>A graphical visualization helps everyone understand how an something works. This app demonstrates how the Bubble Sort sorting algorithm works in detail.
                        <p><br></br>Start by generating a new array for sorting, and click on the BubbleSort button to visualize the algorithm.</p>
                        </b>
                    </div>
                </div>
                <div>
                     <button className='generate' id="generate"onClick={()=>this.generateArray()}><b>Generate an array for sorting</b></button>
                     <button className='bubbleSortButton' onClick={()=>this.BubbleSort()}><b>BubbleSort</b></button>
                 </div>
                <div id="array"></div>
            </div>
        );
    }
}

