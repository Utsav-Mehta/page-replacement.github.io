$(document).ready(function(){
    com=[];
    faults=[]; // represents the page fault
    flag=0; //for the button click

    //"show graph" button 
    $("#btn1").click(function(){        
        //on click function works when button is clicked
        if(flag==0){
            flag=1;
            document.querySelector(".btn1").textContent="Hide Graph"; //updating "show graph" to "hide graph" when graph is presented

            document.querySelector("#graph").innerHTML="<h5>Graph to check Belady's Anomaly</h5>";//graph heading text

            //graph starts
            var can=document.createElement("canvas");   //creating canvas which contains the graph
            can.setAttribute("id","myChart");
            document.querySelector(".chart-container").appendChild(can);
            var ctx = document.getElementById('myChart').getContext('2d');//fetching element using getElement method
            var chart = new Chart(ctx, {                //creating a chart
                type: 'bar',                            //chart type
                data: {
                    labels: com,
                    datasets: [{
                        label: 'No. of Faults',         //Legend text
                        data: faults,                   //data to be showed
                        backgroundColor: '#bd963e',     //background color
                        borderColor: '#fff',            //border color
                        borderWidth: 1                  //border width
                    }]
                },
                options: {
                    //the animation code when the graph is shown
                    animation: { 
                        duration: 5000,                 //duration of the animation
                        //xAxis: true,
                        yAxis: true,                    //for y-axis only
                    },
                    legend: {
                        labels: {
                            fontColor: 'black'          //color of legend text
                        }
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,                      //display type
                                labelString: 'No.of Frames',        //x-axis text
                                fontColor: "white"                  //text color
                            },
                            gridLines: {
                                display: false,
                                color: "blue"                       //color of x-axis
                            },
                            ticks: {
                                fontColor: "white",
                                stepSize: 1,                        //mentioning stepsize for the graph
                                beginAtZero: true
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {           // all attributes of x-axis are mentioned for y-axis as well
                                display: true,
                                labelString: 'No. of Faults',
                                fontColor: "white"
                            },
                            gridLines: {
                                display: false,
                                color: "gray"
                            },
                            ticks: {
                                fontColor: "white",
                                stepSize: 1,
                                beginAtZero: true
                            }
                        }]
                    }
                },
            });
           
        }
        else{       //code for the case where graph shouldn't be displayed
            document.querySelector(".btn1").textContent="Show Graph";       //text changed from hide graph to show graph
            document.querySelector("#graph").innerHTML="";                  //graph html is emptied to remove graph
            document.querySelector(".chart-container").innerHTML="";
            document.querySelector("#last").innerHTML="";
            flag=0;                                                         //flag value changed to 0
        }
        
    });

    var btn=document.querySelector(".submit");

    btn.addEventListener("click", function(){                       //on-click function for submit button
        document.querySelector("#carouselExampleIndicators").classList.remove("d-none");
        document.querySelector("#carouselExampleIndicators").innerHTML=document.querySelector(".hidden2").innerHTML;    //copying html
        var frames=document.querySelector("#frames");        //initialising variables to store information taken as input
        var str=document.querySelector("#istring");
        var inner=document.querySelector(".carousel-inner");
        var ol=document.querySelector("ol");
        com=frames.value.split(" ");
        var pages=str.value.split(" ");
        var n=pages.length;
        faults=[];

        // for(k=0;k<com.length;k++){                                  
        //     var li=document.createElement("li");
        //     if(k==0){
        //         li.classList.add("active");
        //     }
        //     li.setAttribute("data-target","#carouselExampleIndicators");
        //     li.setAttribute("data-slide-to",k);
        //     ol.appendChild(li);
        // }

        for(var k=0;k<com.length;k++){
            var m=parseInt(com[k], 10);                     //parsing string input from user as integers
            var item=document.createElement("div");         //creating a div
            item.classList.add("carousel-item");
            if(k==0){
                item.classList.add("active");
            }
            inner.appendChild(item);                        
            var ul=document.createElement("ul"); //creating html element 
            ul.innerHTML="<h5>Summary</h5>";     //inserting html in element   //showing summary of the input taken from the user
            item.appendChild(ul);               //appending element to the page
            var li=document.createElement("li");
            //Displaying the information entered to the user
            li.textContent="Total frames: "+com[k];
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Algorithm: LRU";
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Total number of input frames: "+pages.length;
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Sequence of pages: "+str.value;
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Does LRU suffer from Belady's Anomaly? No";
            ul.appendChild(li);

            var h=document.createElement("h5");
            h.textContent="Visualization";
            item.appendChild(h);

            var hh=document.createElement("h6");
            hh.textContent="For No. of Frames = "+m;
            item.appendChild(hh);

            var tab=document.createElement("table");            //creating table to show output
            item.appendChild(tab);                              //appending element
            var col=document.createElement("tr");               
            tab.appendChild(col);
            var head=document.createElement("td");
            head.innerHTML="<strong style='background:none'>No.</strong>";  //creating row "Number".
            head.classList.add("tbl-header");
            col.appendChild(head);
            var head=document.createElement("td");
            head.innerHTML="<strong style='background:none'>Page</strong>"; //creating row "Page".
            head.classList.add("tbl-header");
            col.appendChild(head);

            for(var i=0;i<com[k];i++){
                var head=document.createElement("td");
                head.innerHTML="<strong style='background:none'>Frame</strong>";    //creating row "frames" inside for-loop because number of frames is input from user
                head.classList.add("tbl-header");
                col.appendChild(head);
            }
            var head=document.createElement("td");
            head.innerHTML="<strong style='background:none'>Hit</strong>";  //creating row "Hit" to show hit status
            head.classList.add("tbl-header");
            col.appendChild(head);
            var head=document.createElement("td");
            head.innerHTML="<strong style='background:none'>Replaced Page</strong>";    //creating row "Replaced Page" to show replaced pages
            head.classList.add("tbl-header");           //adding "tbl-header" class element to head element
            col.appendChild(head);

            var inst=[];                                //inst array is used to keep track of pages inside a frame
            var hits=0;                                 //Number of hits
            var fault=0;                                //Number of faults

            for(var i=0;i<n;i++){
                var hit=0, v="-";
                var col=document.createElement("tr");
                tab.appendChild(col);
                var head=document.createElement("td");
                head.textContent=i+1;
                col.appendChild(head);
                var head=document.createElement("td");
                head.textContent=pages[i];
                col.appendChild(head);
                var idx=inst.indexOf(pages[i]);
                if(idx==-1){
                    if(inst.length<m){
                        inst.push(pages[i]);
                    }
                    else{
                        v=inst[0];
                        inst=inst.splice(1,inst.length-1);
                        inst.push(pages[i]);
                    }
                    fault++;                                //incrementing value of fault
                }
                else{
                    for(var j=0;j<inst.length;j++){
                        if(pages[i]==inst[j]){          //condition for hit
                            inst.splice(j,1);           //splitting inst array
                            inst.push(pages[i]);        //pushing page into inst array
                            break;
                        }
                    }
                    hit=1;
                    hits++;                                   //incrementing value of hit
                }
                for(var j=inst.length-1;j>=0;j--){
                    var head=document.createElement("td");
                    head.textContent=inst[j];                          //adding pages into frames 
                    if(j==inst.length-1 && hit==0){
                        head.style.background="#ff1a1a";               //adding background
                    }
                    else if(j==inst.length-1 && hit==1){
                        head.style.background="#009900";                //adding background
                    }
                    col.appendChild(head);
                }
                for(var j=0;j<m-inst.length;j++){
                    var head=document.createElement("td");
                    head.textContent="-";
                    col.appendChild(head);
                }
                var head=document.createElement("td");
                if(hit==1){                                    //shows hit status "yes" or "no"
                    head.textContent="Yes";
                }
                else{
                    head.textContent="No";
                }
                col.appendChild(head);                         //output "yes" or "no" is added to the html
                var head=document.createElement("td");
                head.textContent=v;                            //adding text to replaced pages row
                col.appendChild(head);
            }
            var ul=document.createElement("ul");
            ul.innerHTML="<h5>Observations</h5>";           //Observation table which shows output
            item.appendChild(ul);
            var li=document.createElement("li");
            li.textContent="Total references: "+n;          //creating element for showing total references
            ul.appendChild(li);

            var li=document.createElement("li");
            li.textContent="Number of hits: "+hits;         //creating element for showing number of hits
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Number of faults: "+fault;      //creating element for showing number of faults
            faults.push(fault);
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Hit rate: "+hits+"/"+n+" = "+(hits/n)*100+"%";      //creating element for showing hit rate
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Fault rate: "+fault+"/"+n+" = "+(fault/n)*100+"%";      //creating element for showing fault rate
            ul.appendChild(li);
        }

        document.querySelector("#btn1").innerHTML="<button><span style='background:#827ffe'>Show Graph</span></button>";    //updating hide graph to show graph when graph is closed
        document.querySelector("#btn1 button").classList.add("btn1");           //adding class "btn1" to "#btn1 button"

    });
});