<?php
namespace Fcbn\NewSiFloreBundle\Services;

use Doctrine\DBAL\Connection;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\Response;

class PhotoService
{
    private $connection;

    public function __construct(Connection $dbalConnection)
    {
        $this->connection = $dbalConnection;
    }

    private function imagettfstroketext(&$image, $size, $angle, $x, $y, &$textcolor, &$strokecolor, $fontfile, $text, $px)
    {
        for($c1 = ($x-abs($px)); $c1 <= ($x+abs($px)); $c1++)
            for($c2 = ($y-abs($px)); $c2 <= ($y+abs($px)); $c2++)
                $bg = imagettftext($image, $size, $angle, $c1, $c2, $strokecolor, $fontfile, $text);
        return imagettftext($image, $size, $angle, $x, $y, $textcolor, $fontfile, $text);
    }

    /**
     * Returns the links to images related to the given taxon
     */
    public function getLinks($cd_ref)
    {
        //$BasePath="http://94.23.218.10/phototheque";
        $BasePath = '/query/photo/';
        $sql = '/* Getting images for a given taxon */
SELECT img.id
FROM addinfo_images AS adi
JOIN images AS img ON (img.id = adi.id)
WHERE adi.cd_ref=:cd_ref
;';
        $statement = $this->connection->prepare($sql);
        $statement->bindParam(':cd_ref', $cd_ref);
        $tmp = array();
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $tmp[] = ltrim($row['id'], '.');
            }
        }
        return array('imgs' => $tmp);
    }

    /**
     * Streams the image of a given photo
     */
    public function getPhoto($image_id)
    {
        $finder = new Finder();
        $finder->files()->in(__DIR__)->name('arial.ttf');//finding the real path of the textfont used
        foreach ($finder as $file) {
            $fontpath=$file->getRealpath();
        }
        $statement = $this->connection->prepare("SELECT path, author FROM images WHERE id=:id;");
        $statement -> bindParam(':id', $image_id);
        if ($statement->execute()) {
            $row = $statement->fetch();
            $BaseImage = \ImageCreateFromJPEG("http://photo.fcbn.fr".ltrim ($row['path'],'.'));//getting the Original image
            $RedimensionPercent=(700-\imagesx($BaseImage))/\imagesx($BaseImage);//Get the % that should be increased/reduced from the width
            $EditedImage = \imagecreatetruecolor(imagesx($BaseImage)*(1+$RedimensionPercent), imagesy($BaseImage)*(1+$RedimensionPercent));//creating empty proportional image
            $color = \imagecolorallocate($EditedImage, 255, 255, 255);//Color of the credits text
            $strokecolor=\imagecolorallocate($EditedImage, 0, 0, 0);
            imagecopyresized($EditedImage, $BaseImage, 0, 0, 0, 0, \imagesx($EditedImage), \imagesy($EditedImage), \imagesx($BaseImage), \imagesy($BaseImage));

            $this->imagettfstroketext ($EditedImage, 20, 0, 10,\imagesy($EditedImage)-20,$color,$strokecolor,$fontpath,'crédits: '.$row['author'],1);
            \header('Content-type: image/jpeg');
            \imagejpeg($EditedImage);
        }
    }
}

