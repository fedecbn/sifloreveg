<?php

namespace Fcbn\SIFloreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('SIFloreBundle:Default:index.html.twig');
    }
}
