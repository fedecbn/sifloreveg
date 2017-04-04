<?php

namespace Fcbn\NewSIFloreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class PhotoController extends Controller {

    public function linksAction(Request $request, $cd_ref)
    {
        $phs = $this->get('new_si_flore.photo');
        $links = $phs->getLinks($cd_ref);
        $response = new JsonResponse($links);
        return $response;
    }

    public function photoAction(Request $request, $image_id)
    {
        $phs = $this->get('new_si_flore.photo');
        return $phs->getPhoto($image_id);
    }

}

?>
