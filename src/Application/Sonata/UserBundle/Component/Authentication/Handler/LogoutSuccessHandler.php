<?php

namespace Application\Sonata\UserBundle\Component\Authentication\Handler;

use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Bundle\FrameworkBundle\Routing\Router;

class LogoutSuccessHandler implements LogoutSuccessHandlerInterface
{
    private $router;
    public function __construct(Router $router)
    {
        $this->router = $router;
    }
    public function onLogoutSuccess(Request $request)
    {
        $referer=$request->headers->get('referer');
        if ($referer){
            $response = new RedirectResponse($referer);
        }else{
            $response= new RedirectResponse($this->router->generate('fcbn_dashboard_homepage'));
        }
        return $response;
    }   
}
