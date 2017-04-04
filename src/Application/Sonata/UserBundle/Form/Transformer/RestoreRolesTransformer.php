<?php

/*
 * This file is part of the Sonata package.
 *
 * (c) Thomas Rabaix <thomas.rabaix@sonata-project.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

namespace Application\Sonata\UserBundle\Form\Transformer;
use Sonata\UserBundle\Form\Transformer\RestoreRolesTransformer as BaseClass;
use Sonata\UserBundle\Security\EditableRolesBuilder;
use Symfony\Component\Form\DataTransformerInterface;

class RestoreRolesTransformer extends BaseClass
{
    public function reverseTransform($selectedRoles)
    {
        if ($this->originalRoles === null) {
            throw new \RuntimeException('Invalid state, originalRoles array is not set');
        }

        list($availableRoles, ) = $this->rolesBuilder->getRolesNames();

        $hiddenRoles = array_diff($this->originalRoles, $availableRoles);

        return array_merge($selectedRoles, $hiddenRoles);
    }
}
