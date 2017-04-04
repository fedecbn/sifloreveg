<?php
namespace Fcbn\DashboardBundle\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
class DefaultController extends controller
{
    public function dashboardAction()
    {
        return $this->render(
        "FcbnDashboardBundle:Default:index.html.twig");
    }

    public function sendEmailAction()
    {
        $message = \Swift_Message::newInstance()
            ->setSubject('Hello Email')
            ->setFrom('noreply@merlin.gprod.net')
            ->setTo('gprod.net@gmail.com')
            ->setBody('You should see me from the profiler!')
        ;

        $this->get('mailer')->send($message);

        return $this->render('FcbnDashboardBundle:Default:index.html.twig');
    }
}
?>
