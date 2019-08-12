//Dependencies
'use strict'

const { Router } = require('express');
const router = Router();
const _ = require('underscore');

//example
const tasks = require('../example.json');

// Route Raiz
router.get('/', (req, res) => {
    res.json(tasks);
});

// Route Store
router.post('/' , (req, res) => {

    //Campos
    const { title , description, priority, responsable } = req.body;

    //verifico si existen los datos enviados
    if( title && description && priority && responsable){
        
        const id = tasks.length + 1;

        //Agrego la nueva tarea y le asigno un ID
        const newTask = {...req.body, id};

        //Agrega el arreglo de la nueva terea
        tasks.push(newTask);

        //Muestra los nuevos registros
        res.json(tasks);
    }else{
        res.json({error: 'there was an error.'});
    }
});

// Route Put
router.put('/:id', (req, res) => {
    // ID de la Task
    const { id } = req.params;

    //Campos
    const { title , description, priority, responsable } = req.body;

    //verifico si existen los datos enviados
    if( title && description && priority && responsable ){
        _.each( tasks, ( task, i ) => {
            if( task.id == id ){
                task.title = title;
                task.description = description;
                task.priority = priority;
                task.responsable = responsable;
            }
        });
        res.json(tasks);
    }else{
        res.status(500).json({error: "there was an erro"});
    }
})

module.exports = router;