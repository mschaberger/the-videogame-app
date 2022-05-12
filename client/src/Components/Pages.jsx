// VA SOLO EL Paginado con 15 juegos por pagina, mostrando los primeros 15 en la primer pagina, se renderiza en el navbar

import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames } from '../actions';
import { Link } from 'react-router-dom';