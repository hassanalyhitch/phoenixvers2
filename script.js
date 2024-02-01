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

var invalidForm = false;

function nextStep() {
  
  if(currentStep.step == 1){
    //get number of animals
    //remove what was previously added
    //add progress bar sections
    let progressBar = document.getElementById('progressbar')
    dogsCount = document.getElementsByName('dogCount')[0].value;
    horsesCount = document.getElementsByName('horseCount')[0].value;
    ponyCount = document.getElementsByName('ponyCount')[0].value;
    donkeyCount = document.getElementsByName('donkeyCount')[0].value;
    totalAnimalCount = Number(dogsCount) + Number(horsesCount) + Number(ponyCount) + Number(donkeyCount);
    console.log(totalAnimalCount);
    document.querySelectorAll('.dynamic-subpoint').forEach((subpoint, index)=>{subpoint.remove()});
    for(let x=0; x<totalAnimalCount; x++){
      let liTemplate = document.getElementsByClassName('subpoint')[0];
      let liNode = liTemplate.cloneNode(true);
      liNode.classList.add('dynamic-subpoint');
      liNode.classList.remove('subpoint');
      liNode.classList.remove('active');
      progressBar.insertBefore(liNode, document.getElementsByClassName('subpoint')[2]);
    }

    //add animal forms to dom tree
    dogForms(dogsCount);
    horseForms(horsesCount);
    ponyForms(ponyCount);
    donkeyForms(donkeyCount);
  }

  if (currentStep.step < totalSteps) {
    if (currentStep.step === 4) {
        invalidForm = false;
        
        document.querySelectorAll('.dynamic-form').forEach((form, index)=>{
          if(form.querySelector('div > #dogName')?.value == '' || form.querySelector('div > #dogBreed')?.value == '' || form.querySelector('div > #dogBirthDate')?.value == '' || form.querySelector('div > #dogFurColor')?.value == '' || form.querySelector('div > #dogGender')?.value == ''){
            invalidForm = true;
          }
          if(form.querySelector('div > #horseName')?.value == '' || form.querySelector('div > #horseBreed')?.value == '' || form.querySelector('div > #horseBirthDate')?.value == '' || form.querySelector('div > #horseFurColor')?.value == '' || form.querySelector('div > #horseGender')?.value == ''){
            invalidForm = true;
          }
          if(form.querySelector('div > #ponyName')?.value == '' || form.querySelector('div > #ponyBreed')?.value == '' || form.querySelector('div > #ponyBirthDate')?.value == '' || form.querySelector('div > #ponyFurColor')?.value == '' || form.querySelector('div > #ponyGender')?.value == ''){
            invalidForm = true;
          }
          if(form.querySelector('div > #donkeyName')?.value == '' || form.querySelector('div > #donkeyBreed')?.value == '' || form.querySelector('div > #donkeyBirthDate')?.value == '' || form.querySelector('div > #donkeyFurColor')?.value == '' || form.querySelector('div > #donkeyGender')?.value == ''){
            invalidForm = true;
          }
        });

        if(invalidForm){
          return;
        }

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
      document.querySelectorAll('.subpoint').forEach((subpoint, index)=>{subpoint.classList.remove('active')});
      $('.subpoint:eq(0)').addClass('active');
      
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
      document.querySelectorAll('.subpoint').forEach((subpoint, index)=>{
        if(index > 0){
          subpoint.classList.remove('active');
        }
      });
      $('.mainpoint:eq(1)').removeClass('active');
      $('.subpoint:eq(1)').addClass('active');
      
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
      document.querySelectorAll('.subpoint').forEach((subpoint, index)=>{
        if(index > 1){
          subpoint.classList.remove('active');
        }
      });
      //animal form logic
      document.querySelectorAll('.dynamic-form').forEach((form, index)=>{
        console.log(index);
        if(currentSubStep == index){
          form.classList.remove('d-none');
        } else {
          form.classList.add('d-none');
        }
      });

      //progressbar logic
      document.querySelectorAll('.dynamic-subpoint').forEach((subpoint, index)=>{
        if(index < currentSubStep){
          subpoint.classList.add('active');
        } else {
          subpoint.classList.remove('active');
        }
      });

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
      
      document.getElementsByClassName('dynamic-subpoint')[document.getElementsByClassName('dynamic-subpoint').length - 1].classList.add('active');
      document.querySelectorAll('.subpoint').forEach((subpoint, index)=>{
        if(index > 1){
          subpoint.classList.remove('active');
        }
      });
      
      break;
    }
    case 6 :{
      document.querySelectorAll('.step').forEach((step, index)=>{
        if(index != 5){
            step.classList.add('d-none');
        } else {
          step.classList.remove('d-none');
        }
      });
     
      document.querySelectorAll('.subpoint').forEach((subpoint, index)=>{
        if(index > 2){
          subpoint.classList.remove('active');
        }
      });
      $('.subpoint:eq(2)').addClass('active');
      
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
      formContent.classList.add('dynamic-form');
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

//horse forms
function horseForms(animalCount){
  document.querySelectorAll('.horseForm').forEach((form, index)=>{
      if(index > 0){
          form.remove();
      }
  });
  
  for(let i = 0;i < animalCount; i++){
      
      let formContentTemplate = document.getElementsByClassName('horseForm')[0];
      let formContent = formContentTemplate.cloneNode(true);
      
      // formContent.classList.remove('d-none');
      formContent.classList.add('dynamic-form');
      formContent.querySelector('div > #horseName').setAttribute('name', 'horseName'+i);
      formContent.querySelector('div > #horseName').setAttribute('placeholder', `Name des ${i+1}. Pferdes`);

      formContent.querySelector('div > #horseBreed').setAttribute('name', 'horseBreed'+i);
      formContent.querySelector('div > #horseBirthDate').setAttribute('name','horseBirthDate'+i);
      formContent.querySelector('div > #horseFurColor').setAttribute('name','horseFurColor'+ i);
      formContent.querySelector('div > #horseGender').setAttribute('name','horseGender'+ i);


      document.getElementById('animalForm').appendChild(formContent);
      console.log('horse form ', i+1, ' added');
  }     
}

//pony forms
function ponyForms(animalCount){
   
  document.querySelectorAll('.ponyForm').forEach((form, index)=>{
      if(index > 0){
          form.remove();
      }
  });
  
  for(let i = 0;i < animalCount; i++){
      
      let formContentTemplate = document.getElementsByClassName('ponyForm')[0];
      let formContent = formContentTemplate.cloneNode(true);

      // formContent.classList.remove('d-none');
      formContent.classList.add('dynamic-form');
      formContent.querySelector('div > #ponyName').setAttribute('name', 'horseName'+i);
      formContent.querySelector('div > #ponyName').setAttribute('placeholder', `Name des ${i+1}. Ponys`);
      formContent.querySelector('div > #ponyBreed').setAttribute('name', 'ponyBreed'+i);
      formContent.querySelector('div > #ponyBirthDate').setAttribute('name','ponyBirthDate'+i);
      formContent.querySelector('div > #ponyFurColor').setAttribute('name','ponyFurColor'+ i);
      formContent.querySelector('div > #ponyGender').setAttribute('name','ponyGender'+ i);
      document.getElementById('animalForm').appendChild(formContent);
      console.log('pony form ', i+1, ' added');
  }     
}

//donkey forms
function donkeyForms(animalCount){
  document.querySelectorAll('.donkeyForm').forEach((form, index)=>{
      if(index > 0){
          form.remove();
      }
  });

  for(let i = 0;i < animalCount; i++){
      
      let formContentTemplate = document.getElementsByClassName('donkeyForm')[0];
      let formContent = formContentTemplate.cloneNode(true);
      
      // formContent.classList.remove('d-none');
      formContent.classList.add('dynamic-form');
      formContent.querySelector('div > #donkeyName').setAttribute('name', 'donkeyName'+i);
      formContent.querySelector('div > #donkeyName').setAttribute('placeholder', `Name des ${i+1}. Esels`);
      formContent.querySelector('div > #donkeyBreed').setAttribute('name', 'donkeyBreed'+i);
      formContent.querySelector('div > #donkeyBirthDate').setAttribute('name','donkeyBirthDate'+i);
      formContent.querySelector('div > #donkeyFurColor').setAttribute('name','donkeyFurColor'+ i);
      formContent.querySelector('div > #donkeyGender').setAttribute('name','donkeyGender'+ i);

      document.getElementById('animalForm').appendChild(formContent);
      console.log('donkey form ', i+1, ' added');
  }   
}
