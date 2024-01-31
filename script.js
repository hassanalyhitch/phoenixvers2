console.log('Hello!');

var totalSteps = 11;
var subStep = 0;

var currentStep = {
  _internal: 1,
  aListener: function(val) {},
  set step(val) {
    this._internal = val;
    this.aListener(val);
  },
  get step() {
    return this._internal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
};

var currentSubStep = 0;

var dogs= [];
var horses= [];
var pony= [];
var donkey= [];

var animalDataArr = [dogs,horses,pony,donkey];

var dogsCount = 0;
var horsesCount = 0; 
var ponyCount = 0;
var donkeyCount = 0;
var totalAnimalCount = 0;

function nextStep() {
  
  if(currentStep.step == 1){
    //get number of animals
    //remove what was previously added
    //add progress bar sections
    let progressBar = document.getElementById('progressbar')
    totalAnimalCount = document.getElementsByName('animalNumber')[0].value;
    console.log(totalAnimalCount);
    document.querySelectorAll('.dynamic-subpoint').forEach((subpoint, index)=>{subpoint.remove()});
    for(let x=0; x<totalAnimalCount; x++){
      let liTemplate = document.getElementsByClassName('subpoint')[0];
      let liNode = liTemplate.cloneNode(true);
      liNode.classList.add('dynamic-subpoint');
      liNode.classList.remove('active')
      progressBar.insertBefore(liNode, document.getElementsByClassName('subpoint')[2]);
    }


    //testing - let dogs = totalAnimalCount
      dogsCount = totalAnimalCount;
    // 
    //add animal forms to dom tree
    dogForms(dogsCount);
  }

  if (currentStep.step < totalSteps) {
    if (currentStep.step === 4) {
      totalAnimalCount = Number(dogsCount) + Number(horsesCount) + Number(ponyCount) + Number(donkeyCount);
      console.log('current substep ', currentSubStep, 'totalAnimal ', totalAnimalCount);
      if (currentSubStep < (totalAnimalCount - 1)) {
        console.log('yes')
        currentSubStep++;
        currentStep.step = 4;
        return;
      }
    }
    // currentSubStep = 0;
    currentStep.step++;
  }

}

function prevStep() {
  if (currentStep.step > 1) {
    if (currentStep.step === 4) {
      if (currentSubStep > 0) {
        currentSubStep--;
        currentStep.step = 4;
        return;
      }
    }
    totalAnimalCount = Number(dogsCount) + Number(horsesCount) + Number(ponyCount) + Number(donkeyCount);
    currentStep.step--;
    if (currentStep.step === 4) {
      currentSubStep = (totalAnimalCount - 1);
      currentStep.step = 4
      return;
    }
    currentSubStep = 0;
  }
}

currentStep.registerListener(function(step){
  console.log('step ',step);
  console.log('substep ',currentSubStep);
  switch(step){
    case 1 :{
      document.querySelectorAll('.step').forEach((step, index)=>{
        
        if(index != 0){
            step.classList.add('d-none');
        } else {
          step.classList.remove('d-none');
        }
      });
      
      document.querySelectorAll('.subpoint').forEach((subpoint, index)=>{subpoint.classList.remove('active')});
      break;
    }
    case 2 :{
      document.querySelectorAll('.step').forEach((step, index)=>{
        if(index != 1){
            step.classList.add('d-none');
        } else {
          step.classList.remove('d-none');
        }
      });
      $('.subpoint:eq(0)').addClass('active');
      document.querySelectorAll('.subpoint').forEach((subpoint, index)=>{
        if(index > 0){
          subpoint.classList.remove('active');
        }
      });
      break;
    }
    case 3 :{
      document.querySelectorAll('.step').forEach((step, index)=>{
        if(index != 2){
            step.classList.add('d-none');
        } else {
          step.classList.remove('d-none');
        }
      });
      $('.subpoint:eq(1)').addClass('active');
      document.querySelectorAll('.subpoint').forEach((subpoint, index)=>{
        if(index > 1){
          subpoint.classList.remove('active');
        }
      });
      
      // document.querySelectorAll('.dynamic-subpoint').forEach((subpoint, index)=>{
      //   subpoint.classList.remove('active');
      // });
      break;
    }
    case 4 :{
      document.querySelectorAll('.step').forEach((step, index)=>{
        if(index != 3){
            step.classList.add('d-none');
        } else {
          step.classList.remove('d-none');
        }
      });
      
      $('.mainpoint:eq(1)').addClass('active');

      //animal form logic
      if(currentSubStep < 5){
        //dog
        switch(currentSubStep){
          case 0: {
            document.querySelectorAll('.dogForm').forEach((form, index)=>{
              if(index > 0){
                  form.classList.add('d-none');
                }
            });
            
            document.getElementsByClassName('dogForm')[1].classList.remove('d-none');
            document.querySelectorAll('.dynamic-subpoint').forEach((subpoint, index)=>{
              subpoint.classList.remove('active');
            });
            break;
          }
          case 1: {
            document.querySelectorAll('.dogForm').forEach((form, index)=>{
              if(index != 2){
                  form.classList.add('d-none');
                }
            });
            
            document.getElementsByClassName('dogForm')[2].classList.remove('d-none');
            document.querySelectorAll('.dynamic-subpoint').forEach((subpoint, index)=>{
              if(index > 0){
                subpoint.classList.remove('active');
              }
            });
            $('.dynamic-subpoint:eq(0)').addClass('active');
            break;
          }
          case 2: {
            document.querySelectorAll('.dogForm').forEach((form, index)=>{
              if(index != 3){
                  form.classList.add('d-none');
                }
            });
            
            document.getElementsByClassName('dogForm')[3].classList.remove('d-none');
            $('.dynamic-subpoint:eq(1)').addClass('active');
            document.querySelectorAll('.dynamic-subpoint').forEach((subpoint, index)=>{
              if(index > 1){
                subpoint.classList.remove('active');
              }
            });
            break;
          }
          case 3: {
            document.querySelectorAll('.dogForm').forEach((form, index)=>{
              if(index != 4){
                  form.classList.add('d-none');
                }
            });
            
            document.getElementsByClassName('dogForm')[4].classList.remove('d-none');
            $('.dynamic-subpoint:eq(2)').addClass('active');
            document.querySelectorAll('.dynamic-subpoint').forEach((subpoint, index)=>{
              if(index > 2){
                subpoint.classList.remove('active');
              }
            });
            break;
          }
          case 4: {
            document.querySelectorAll('.dogForm').forEach((form, index)=>{
              if(index != 5){
                  form.classList.add('d-none');
                }
            });
            
            document.getElementsByClassName('dogForm')[5].classList.remove('d-none');
            $('.dynamic-subpoint:eq(3)').addClass('active');
            document.querySelectorAll('.dynamic-subpoint').forEach((subpoint, index)=>{
              if(index > 3){
                subpoint.classList.remove('active');
              }
            });
            break;
          }
        }

      } else if(currentSubStep < 10){
        //horse

      } else if(currentSubStep < 15){
        //pony

      } else {
        //donkey

      }
      break;
    }
    case 5 :{
      document.querySelectorAll('.step').forEach((step, index)=>{
        if(index != 4){
            step.classList.add('d-none');
        } else {
          step.classList.remove('d-none');
        }
      });
      $('.subpoint:eq(2)').addClass('active');
      document.querySelectorAll('.subpoint').forEach((subpoint, index)=>{
        if(index > 2){
          subpoint.classList.remove('active');
        }
      });
      
      // document.querySelectorAll('.dynamic-subpoint').forEach((subpoint, index)=>{
      //   subpoint.classList.remove('active');
      // });
      break;
    }

  }
});



//dog Forms
function dogForms(animalCount){
  document.querySelectorAll('.dogForm').forEach((form, index)=>{
      if(index > 0){
          form.remove();
          console.log('dog form index ', index, ' removed');
      }
  });
  
  for(let i = 0;i < animalCount; i++){
      
      let formContentTemplate = document.getElementsByClassName('dogForm')[0];
      let formContent = formContentTemplate.cloneNode(true);
      
      // formContent.classList.remove('d-none');
      formContent.querySelector('div > #dogName').setAttribute('name', 'dogName'+i);
      formContent.querySelector('div > #dogName').setAttribute('placeholder', `Name des ${i+1}. Hundes`);

      formContent.querySelector('div > #dogBreed').setAttribute('name', 'dogBreed'+i);
      formContent.querySelector('div > #dogBirthDate').setAttribute('name','dogBirthDate'+i);
      formContent.querySelector('div > #dogFurColor').setAttribute('name','dogFurColor'+ i);
      formContent.querySelector('div > #dogGender').setAttribute('name','dogGender'+ i);
      formContent.querySelector('div > #dogChipNumber').setAttribute('name','dogChipNumber'+ i);

      document.getElementById('animalForm').appendChild(formContent);
      console.log('dog form ', i+1, ' added');
  } 
      
}
